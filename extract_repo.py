
import os
import subprocess
import shutil
from pathlib import Path

# Configuration
REPO_URL = "https://github.com/ompatel585/Cerlia_Playground"
CLONE_DIR = "temp_repo_clone"
OUTPUT_FILE = "repo_contents.txt"

# Directories to exclude (case-insensitive)
EXCLUDE_DIRS = {
    'node_modules', '.git', 'dist', 'build', '.next', 
    'coverage', '.cache', '__pycache__', '.venv', 'venv',
    '.idea', '.vscode', 'out', 'target', '.nuxt', 'bower_components'
}

# Files to exclude
EXCLUDE_FILES = {
    '.DS_Store', 'package-lock.json', 'yarn.lock', 
    'pnpm-lock.yaml', '.gitignore'
}

# Binary file extensions to skip
BINARY_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', 
    '.pdf', '.zip', '.tar', '.gz', '.exe', '.dll',
    '.so', '.dylib', '.woff', '.woff2', '.ttf', '.eot',
    '.bin', '.webp', '.mp4', '.mov', '.avi'
}

def should_exclude_path(path, base_dir):
    """Check if a path should be excluded"""
    rel_path = os.path.relpath(path, base_dir)
    path_parts = Path(rel_path).parts

    # Check if any parent directory is in exclude list
    for part in path_parts:
        if part.lower() in EXCLUDE_DIRS:
            return True
    return False

def is_binary_file(file_path):
    """Check if file is binary or has binary extension"""
    if Path(file_path).suffix.lower() in BINARY_EXTENSIONS:
        return True

    # Try to detect binary by reading first chunk
    try:
        with open(file_path, 'rb') as f:
            chunk = f.read(1024)
            # Check for null bytes (common in binary files)
            if b'\x00' in chunk:
                return True
    except:
        return True
    return False

def extract_repo_contents():
    """Main function to extract repository contents"""

    print("=" * 60)
    print("Git Repository Content Extractor")
    print("=" * 60)
    print(f"Repository: {REPO_URL}")
    print(f"Output File: {OUTPUT_FILE}")
    print("=" * 60)

    # Step 1: Clone repository
    print("\n[1/4] Cloning repository...")
    if os.path.exists(CLONE_DIR):
        print(f"  → Removing existing directory: {CLONE_DIR}")
        shutil.rmtree(CLONE_DIR)

    try:
        result = subprocess.run(
            ['git', 'clone', '--depth', '1', REPO_URL, CLONE_DIR],
            check=True,
            capture_output=True,
            text=True
        )
        print(f"  ✓ Successfully cloned repository")
    except subprocess.CalledProcessError as e:
        print(f"  ✗ Error cloning repository:")
        print(f"    {e.stderr}")
        return
    except FileNotFoundError:
        print("  ✗ Git is not installed or not in PATH")
        return

    # Step 2: Scan files
    print("\n[2/4] Scanning files...")
    all_files = []
    excluded_count = 0

    for root, dirs, files in os.walk(CLONE_DIR):
        # Filter out excluded directories
        dirs[:] = [d for d in dirs if d.lower() not in EXCLUDE_DIRS]

        for file in files:
            file_path = os.path.join(root, file)

            # Skip excluded files
            if file in EXCLUDE_FILES:
                excluded_count += 1
                continue

            # Skip if in excluded directory
            if should_exclude_path(file_path, CLONE_DIR):
                excluded_count += 1
                continue

            # Skip binary files
            if is_binary_file(file_path):
                excluded_count += 1
                continue

            all_files.append(file_path)

    print(f"  ✓ Found {len(all_files)} files to extract")
    print(f"  → Excluded {excluded_count} files (binary/build artifacts)")

    # Step 3: Extract contents
    print("\n[3/4] Extracting file contents...")

    with open(OUTPUT_FILE, 'w', encoding='utf-8', errors='ignore') as outfile:
        # Write header
        outfile.write(f"Repository: {REPO_URL}\n")
        outfile.write(f"Total Files: {len(all_files)}\n")
        outfile.write("=" * 80 + "\n\n")

        for idx, file_path in enumerate(sorted(all_files), 1):
            rel_path = os.path.relpath(file_path, CLONE_DIR)

            # Progress indicator
            if idx % 10 == 0 or idx == len(all_files):
                print(f"  → Processing: {idx}/{len(all_files)} files", end='\r')

            # Write file header
            outfile.write("\n" + "=" * 80 + "\n")
            outfile.write(f"FILE: {rel_path}\n")
            outfile.write("=" * 80 + "\n\n")

            # Write file contents
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                    content = infile.read()
                    outfile.write(content)
                    if not content.endswith('\n'):
                        outfile.write('\n')
            except Exception as e:
                outfile.write(f"[ERROR reading file: {str(e)}]\n")

        outfile.write("\n" + "=" * 80 + "\n")
        outfile.write("END OF REPOSITORY CONTENTS\n")
        outfile.write("=" * 80 + "\n")

    print(f"\n  ✓ Successfully extracted all file contents")

    # Step 4: Cleanup
    print("\n[4/4] Cleaning up...")
    try:
        shutil.rmtree(CLONE_DIR)
        print(f"  ✓ Removed temporary directory: {CLONE_DIR}")
    except Exception as e:
        print(f"  ⚠ Could not remove temp directory: {str(e)}")

    # Summary
    print("\n" + "=" * 60)
    print("✓ COMPLETE!")
    print("=" * 60)
    print(f"Output file: {OUTPUT_FILE}")
    print(f"Total files extracted: {len(all_files)}")

    # File size
    size_bytes = os.path.getsize(OUTPUT_FILE)
    size_kb = size_bytes / 1024
    size_mb = size_kb / 1024
    if size_mb > 1:
        print(f"File size: {size_mb:.2f} MB")
    else:
        print(f"File size: {size_kb:.2f} KB")
    print("=" * 60)

if __name__ == "__main__":
    try:
        extract_repo_contents()
    except KeyboardInterrupt:
        print("\n\nOperation cancelled by user")
    except Exception as e:
        print(f"\n✗ Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
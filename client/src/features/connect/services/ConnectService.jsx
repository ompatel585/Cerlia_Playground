


export const createRoute = async (path, methods) => {
  const response = await fetch("http://localhost:5000/api/create-route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, methods }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to create routes");

  // Fetch updated routes
  const routesResponse = await fetch("http://localhost:5000/api/routes");
  const routesData = await routesResponse.json();
  if (!routesResponse.ok)
    throw new Error(routesData.error || "Failed to fetch routes");

  return routesData; // This returns { routes: [...] }
};

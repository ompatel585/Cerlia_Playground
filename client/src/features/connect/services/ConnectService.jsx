


// //client/src/features/connect/services/ConnectService.jsx
// export const createRoute = async (path, methods) => {
//   const response = await fetch("http://localhost:5000/api/create-route", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ path, methods }),
//   });

//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error || "Failed to create routes");

//   // Fetch updated routes
//   const routesResponse = await fetch("http://localhost:5000/api/routes");
//   const routesData = await routesResponse.json();
//   if (!routesResponse.ok)
//     throw new Error(routesData.error || "Failed to fetch routes");

//   return routesData; // This returns { routes: [...] }
// };



// // client/src/features/connect/services/ConnectService.jsx
// export const createRoute = async (payload) => {
//   const response = await fetch("http://localhost:5000/api/create-route", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Failed to create route");
//   }

//   // refetch all routes to refresh the dashboard
//   const routesRes = await fetch("http://localhost:5000/api/routes");
//   const routes = await routesRes.json();
//   if (!routesRes.ok) {
//     throw new Error(routes.message || "Failed to fetch routes");
//   }

//   return routes;
// };




// // client/src/features/connect/services/ConnectService.jsx
// export const createRoute = async (path, methods) => {
//   // always build a real object; never send a raw string
//   const payload = {
//     path: path.startsWith("/") ? path : `/${path}`,
//     methods: Array.isArray(methods) ? methods : [methods],
//     serviceType: "qr-generator",
//     inputSchema: [{ name: "data", type: "string", required: true }],
//     outputSpec: { statusCode: 200 },
//   };

//   const res = await fetch("/create-route", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),        // ✅ valid JSON string
//   });

//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) {
//     throw new Error(data.message || `Failed (${res.status})`);
//   }

//   // reload routes
//   const routesRes = await fetch("/api/routes");
//   const routes = await routesRes.json();
//   return routes;
// };



const BASE_URL = "https://cerlia-playground.onrender.com";

export const createRoute = async (path, methods) => {
  const payload = {
    path: path.startsWith("/") ? path : `/${path}`,
    methods: Array.isArray(methods) ? methods : [methods],
    serviceType: "qr-generator",
    inputSchema: [{ name: "data", type: "string", required: true }],
    outputSpec: { statusCode: 200 },
  };

  // CREATE ROUTE
  const res = await fetch(`${BASE_URL}/create-route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Failed (${res.status})`);
  }

  // FETCH ALL ROUTES
  const routesRes = await fetch(`${BASE_URL}/api/routes`);
  const routes = await routesRes.json();

  return routes;
};

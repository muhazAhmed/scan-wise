export const ServerVariables = {
  // ============= Admin ================
  registerAdmin: "api/user/register",
  loginAdmin: "api/user/login",
  deleteAdmin: "api/user/:id",
  updateAdmin: "api/user/:id",
  logoutAdmin: "api/user/:id",

  // ============= Employee ==============
  registerEmp: "api/emp/register",
  loginEmp: "api/emp/login",
  deleteEmp: "api/emp/:id",
  logoutEmp: "api/emp/:id",

  // ============= Product ================
  getProduct: "api/product/get",
  getProductById: "api/product/:id",
  getProductByName: "api/order?name",
  addProduct: "api/product/add",
  updateProduct: "api/product/:id",
  deleteProduct: "api/product/:id",

  // ============= Order ================
  getOrder: "api/order/get",
  getOrderById: "api/order/:id",
  createOrder: "api/order/add",
  editOrder: "api/order/:id",
  deleteOrder: "api/order/:id",

  // ============= Cart ================
  getCart: "api/cart/get",
  getCartById: "api/cart/:id",
  createCart: "api/cart/add",
  editCart: "api/cart/:id",
  deleteCart: "api/cart/:id",
};

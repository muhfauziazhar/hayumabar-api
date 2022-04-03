import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/register", "AuthController.register").as("user.register");
  Route.post("/login", "AuthController.login").as("user.login");
  Route.post("/otp-confirmation", "AuthController.otp_verification").as(
    "user.verification"
  );
}).prefix("/api/v1");

Route.group(() => {
  Route.resource("venues", "VenuesController")
    .apiOnly()
    .middleware({ "*": ["verify", "owner"] });
  Route.resource("venues.fields", "FieldsController")
    .apiOnly()
    .middleware({ "*": ["verify", "owner"] });
  Route.post("/venues/:id/bookings", "BookingsController.store")
    .middleware("auth")
    .middleware(["verify", "user"]);
  Route.get("/bookings", "BookingsController.index").middleware([
    "verify",
    "owner",
  ]);
  Route.get("/bookings/:id", "BookingsController.show").middleware(["verify"]);
  Route.put("/bookings/:id/join", "BookingsController.join").middleware([
    "verify",
    "user",
  ]);
  Route.put("/bookings/:id/unjoin", "BookingsController.unjoin").middleware([
    "verify",
    "user",
  ]);
  Route.get("/schedules", "BookingsController.schedules").middleware([
    "verify",
    "user",
  ]);
})
  .prefix("/api/v1")
  .middleware("auth");

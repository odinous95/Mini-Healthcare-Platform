import { createApp } from "./app";
createApp().listen(3000, "0.0.0.0", () => {
  console.log(`Server started on http://localhost:3000.`);
});

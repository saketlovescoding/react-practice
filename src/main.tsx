import { createRoot } from "react-dom/client";
import { RegistrationForm } from "./features/form/index";

const root = createRoot(document.getElementById("root")!);
root.render(<RegistrationForm />);

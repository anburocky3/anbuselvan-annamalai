"use client";

import { useEffect } from "react";
import * as serviceWorker from "../app/serviceWorkerRegistration";

export default function ServiceWorkerProvider() {
  useEffect(() => {
    serviceWorker.register();
  }, []);

  return null;
}

"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// Hardcoded JWT token from user
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTJlYTk2OTNkMTIyOTY4NTU3MDc5OCIsImVtYWlsIjoidGVhY2hlckBkZW1vLmNvbSIsImlhdCI6MTc3OTYzMzQ2M30.V0vGR0sW1nH0FMaa3bLfWihbxc-5SQ2PB0dQy6-y7fo";

let socket: Socket;

export default function Home() {

  return (
    <main className="p-8 max-w-4xl mx-auto font-sans">
    </main>
  );
}

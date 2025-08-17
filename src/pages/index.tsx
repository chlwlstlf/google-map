// src/app/page.js

import MapComponent from "./components/MapComponent";

export default function HomePage() {
  return (
    <div>
      <h1>내 위치 지도</h1>
      <MapComponent />
    </div>
  );
}

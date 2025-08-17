import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapComponent = () => {
  // HTML 요소를 참조하는 useRef에 타입을 명시합니다.
  const mapDivRef = useRef<HTMLDivElement | null>(null);

  // 지도 객체 또는 null 타입을 허용하도록 useState에 타입을 명시합니다.
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      // 지도를 띄우고 마커를 바로 찍어야 하므로 두 라이브러리를 함께 로드합니다.
      libraries: ["maps", "marker"],
    });

    loader.load().then(() => {
      const google = window.google;

      if (mapDivRef.current) {
        const newMap = new google.maps.Map(mapDivRef.current, {
          center: { lat: 37.5665, lng: 126.978 },
          zoom: 15,
        });
        setMap(newMap);

        addMarkers(newMap);
      }
    });
  }, []);

  const addMarkers = (mapInstance: google.maps.Map) => {
    const locations = [
      // 46개의 마커 데이터 (예시)
      { lat: 37.567, lng: 126.979 },
      { lat: 37.565, lng: 126.977 },
      // ... 44개 더 추가
    ];

    locations.forEach((location) => {
      // 최신 API인 AdvancedMarkerElement를 사용합니다.
      new google.maps.marker.AdvancedMarkerElement({
        position: location,
        map: mapInstance,
      });
    });
  };

  return (
    <div
      ref={mapDivRef}
      style={{
        width: "100%",
        height: "500px",
        border: "1px solid #ccc",
      }}
    />
  );
};

export default MapComponent;

import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useCallback } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const MAP_ID = "c73da83ccb7bf5d2c7528326";

const locations = [
  { lat: 37.567, lng: 126.979 },
  { lat: 37.565, lng: 126.977 },
  { lat: 37.5796, lng: 126.977 }, // 경복궁
  { lat: 37.5512, lng: 126.988 }, // 남산서울타워
  { lat: 37.5215, lng: 127.103 }, // 롯데월드
  { lat: 37.5118, lng: 127.0593 }, // 코엑스
  { lat: 37.5636, lng: 126.9829 }, // 명동
];

const MapComponent = () => {
  const defaultCenter = { lat: 37.5665, lng: 126.978 };
  const defaultZoom = 12;

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          mapId={MAP_ID}
        >
          <MarkerClickHandler />
        </Map>
      </APIProvider>
    </div>
  );
};

const MarkerClickHandler = () => {
  const map = useMap();

  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);
      console.log("마커가 클릭되었습니다:", ev.latLng.toString());
    },
    [map]
  );

  return (
    <>
      {locations.map((location, index) => (
        <AdvancedMarker
          key={index}
          position={location}
          onClick={handleClick}
          clickable={true}
        />
      ))}
    </>
  );
};

export default MapComponent;

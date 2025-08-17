import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const MAP_ID = "c73da83ccb7bf5d2c7528326";

// 마커 위치 정보와 모든 속성을 포함한 배열
const locations = [
  { id: 1, name: "경복궁", lat: 37.5796, lng: 126.977 },
  { id: 2, name: "남산서울타워", lat: 37.5512, lng: 126.988 },
  { id: 3, name: "롯데월드", lat: 37.5215, lng: 127.103 },
  { id: 4, name: "코엑스", lat: 37.5118, lng: 127.0593 },
  { id: 5, name: "명동", lat: 37.5636, lng: 126.9829 },
];

// 마커 정보 타입 정의
type Location = (typeof locations)[0];

const MapComponent = () => {
  const defaultCenter = { lat: 37.5665, lng: 126.978 };
  const defaultZoom = 12;
  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          mapId={MAP_ID}
          style={{ width: "100%", height: "50vh" }} // 지도는 화면의 절반만
        >
          <MarkerClickHandler onMarkerClick={setClickedLocation} />
        </Map>
      </APIProvider>

      {/* 지도 밑에 정보 패널 */}
      {clickedLocation && (
        <div
          style={{
            height: "50vh", // 나머지 절반
            overflowY: "auto",
            padding: "15px",
            borderTop: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>클릭된 마커 정보:</h3>
          <p>
            <strong>ID:</strong> {clickedLocation.id}
          </p>
          <p>
            <strong>이름:</strong> {clickedLocation.name}
          </p>
          <p>
            <strong>위도:</strong> {clickedLocation.lat}
          </p>
          <p>
            <strong>경도:</strong> {clickedLocation.lng}
          </p>
        </div>
      )}
    </div>
  );
};

// 마커 클릭 로직을 담당하는 별도의 컴포넌트
const MarkerClickHandler = ({ onMarkerClick }: { onMarkerClick: (location: Location) => void }) => {
  const map = useMap();

  const handleClick = useCallback(
    (locationData: Location, ev: google.maps.MapMouseEvent) => {
      if (!map || !ev.latLng) return;
      map.panTo(ev.latLng);

      // 클릭된 마커의 전체 객체 전달
      onMarkerClick(locationData);

      console.log(`마커가 클릭되었습니다:`, locationData);
    },
    [map, onMarkerClick]
  );

  return (
    <>
      {locations.map((location) => (
        <AdvancedMarker
          key={location.id}
          position={{ lat: location.lat, lng: location.lng }}
          onClick={(ev) => handleClick(location, ev)} // location 전체 객체 전달
          clickable={true}
        />
      ))}
    </>
  );
};

export default MapComponent;

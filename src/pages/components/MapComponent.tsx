import { AdvancedMarker, APIProvider, Map, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useState } from "react";

// 마커 정보 타입과 데이터
type Location = { id: number; name: string; lat: number; lng: number };
const locations: Location[] = [
  { id: 1, name: "경복궁", lat: 37.5796, lng: 126.977 },
  { id: 2, name: "남산서울타워", lat: 37.5512, lng: 126.988 },
  { id: 3, name: "롯데월드", lat: 37.5215, lng: 127.103 },
  { id: 4, name: "코엑스", lat: 37.5118, lng: 127.0593 },
  { id: 5, name: "명동", lat: 37.5636, lng: 126.9829 },
];

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const MAP_ID = "c73da83ccb7bf5d2c7528326";

const MapComponent = () => {
  const defaultCenter = { lat: 37.5665, lng: 126.978 };
  const defaultZoom = 12;

  const [clickedLocation, setClickedLocation] = useState<Location | null>(null);

  // handleClick 함수를 MapComponent 내부에 정의
  const handleClick = useCallback((locationData: Location) => {
    // Map 컴포넌트 내부에 마커를 두었으므로 useMap() 훅을 사용할 필요 없음
    // 상태 업데이트만 진행
    setClickedLocation(locationData);
    console.log(`마커가 클릭되었습니다:`, locationData);
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          mapId={MAP_ID}
        >
          {/* 마커들을 Map 컴포넌트 내부에 직접 렌더링 */}
          {locations.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleClick(location)}
              clickable={true}
            />
          ))}
        </Map>
      </APIProvider>

      {clickedLocation && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
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

export default MapComponent;

import { useMap } from "react-leaflet";

export default function ChangePosition({ center }){
    const map = useMap();
    map.flyTo(center, map.getZoom(20));
    return null;
}
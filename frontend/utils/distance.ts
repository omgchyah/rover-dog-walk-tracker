import useLocation from "hooks/useLocation";

const { route } = useLocation();

const distance = () => {

    if (route.length < 2) return 0;

    function convertToRadian(degrees: number) {
        return degrees * Math.PI / 180;
    }
    
    let totalDistance = 0;

    route.reduce({coord, acc} => {
        return
    })



}

export default distance;
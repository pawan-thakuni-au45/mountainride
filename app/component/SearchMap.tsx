"use client"
import axios from "axios"
import L from "leaflet"
import { tr } from "motion/react-client"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet"

type props = {
    pickUp: string,
    drop: string,
    onChange: (p: string, d: string) => void,
    onDistance: (d: number) => void
}

function FitBounds({ p1, p2 }: { p1: [number, number], p2: [number, number] }) {
    const map = useMap()
    useEffect(() => {
        map.invalidateSize()
        map.fitBounds([p1, p2], { padding: [72, 72], maxZoom: 15, animate: true, duration: 1 })
    }, [p1, p2, map])
    return null

}



function SearchMap({ pickUp, drop, onChange, onDistance }: props) {


    //this will take address and convert it into lat and longtitude
    const [p1, setP1] = useState<[number, number]>()
    const [p2, setP2] = useState<[number, number]>()
    const [km,setKm]=useState<number | null >()
    const [route,setRoute]=useState<[number,number][]>([])
    const geoCoding = async (q: string): Promise<[number, number] | null> => {
        try {
            const { data } = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1`)
            if (!data.features.length) return null;
            const [lon, lat] = data.features[0].geometry.coordinates
            return [lat, lon]

        } catch (error) {
            console.log(error)
            return null
        }

    }

    const loadRoute = async (p:[number,number],d:[number,number]) => {
        try {
            const { data } = await axios.get(`https://router.project-osrm.org/route/v1/driving/${p[1]},${p[0]};${d[1]},${d[0]}?overview=full&geometries=geojson`)
            // if (!data.features.length) return null;
            console.log("data:",data)
            setRoute(data.routes[0].geometry.coordinates.map(([lon,lat]:number[])=>[lat,lon]))
            const distKm=+((data.routes[0].distance)/1000).toFixed(2)
            setKm(distKm)
            onDistance(distKm)
            


        } catch (error) {
console.log("data error",error)
        }
    }

    useEffect(() => {
        if (pickUp && drop) {
            (async () => {
                const a = await geoCoding(pickUp)
                const b = await geoCoding(drop)
                if (!a || !b) {
                    return
                }
                await loadRoute(a,b)
                setP1(a)
                setP2(b)
            })()

        }
    }, [pickUp, drop])
    return (
        <div className="relative h-full w-full bg-zinc-100">
            <MapContainer
                style={
                    {
                        width: "100%", height: "100% "
                    }
                }
                center={p1 ?? [0, 0]} zoom={13}


            >

                <TileLayer
                    attribution='&copy; <a href="https://carto.com/">"CARTO"</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png" />
                {p1 && p2 && <FitBounds p1={p1} p2={p2} />}
                {p1 && <Marker
                    position={p1}
                />}
                {p2 && <Marker
                    position={p2}
                />}


                {route.length >0 && (
                    <>
                    <Polyline positions={route} pathOptions={{color:"#0a0a0a"}} weight={4}/>
                    </>
                )}
            </MapContainer>

        </div>
    )
}

export default SearchMap
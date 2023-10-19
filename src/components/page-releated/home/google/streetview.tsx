import { MapBrowserEvent } from "ol";
import { unByKey } from "ol/Observable";

import React, { useCallback, useState } from "react";
import * as proj from "ol/proj";
import {
    GoogleMap,
    LoadScript,
    StreetViewPanorama,
} from "@react-google-maps/api";

import { EventsKey } from "ol/events";
import { useOlMap } from "../../../../shared/hooks/useOlMap";
import { RoundedButton, Modal } from "../../../global";

import { StreetViewIcon } from "../../../../shared/assets/icons";
import { useToggle } from "../../../../shared/hooks/useToggle";

export const StreetViewMenu: React.FC = () => {
    const { map } = useOlMap();
    const { isActive, toggle } = useToggle();

    const [mapKey, setMapKey] = useState<EventsKey>();
    const [coordinates, setCoordinates] = useState<{
        lat: number;
        lng: number;
    }>();

    const coordinatesFromMap = useCallback(() => {
        if (isActive && mapKey) {
            unByKey(mapKey);
        } else {
            const key = map?.on(
                "singleclick",
                (e: MapBrowserEvent<PointerEvent>) => {
                    e.preventDefault();

                    const [lng, lat] = proj.transform(
                        [e.coordinate[0], e.coordinate[1]],
                        "EPSG:3857",
                        "EPSG:4326"
                    );

                    setCoordinates({
                        lat,
                        lng,
                    });
                }
            );

            setMapKey(key);
        }

        toggle();
    }, [map, mapKey, toggle, isActive]);

    return (
        <>
            <RoundedButton
                active={isActive}
                onClick={coordinatesFromMap}
                description="STREET VIEW"
            >
                <img
                    className="h-7 w-7 md:h-10 md:w-10"
                    src={StreetViewIcon}
                    alt="street view"
                />
            </RoundedButton>
            <LoadScript googleMapsApiKey="AIzaSyDRg9OW1xc4RASow5wotYe68DPUYjc6W80">
                {coordinates && (
                    <Modal
                        show={!!coordinates}
                        handleCloseModal={() => setCoordinates(undefined)}
                        size="xl"
                    >
                        <GoogleMap
                            center={coordinates}
                            mapContainerStyle={{
                                height: "400px",
                                width: "100%",
                            }}
                            zoom={20}
                        >
                            <StreetViewPanorama
                                options={{
                                    position: coordinates,
                                    visible: true,
                                }}
                            />
                        </GoogleMap>
                    </Modal>
                )}
            </LoadScript>
        </>
    );
};

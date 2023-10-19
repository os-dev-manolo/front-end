import React, { useState, useCallback, useEffect } from "react";
import { Dictionary, groupBy } from "lodash";

import { useLayersSideBar } from "../../../../../shared/hooks/useSideBar";
import { ILayers } from "../../../../../shared/interfaces/ILayers";
import { LayersApiService } from "../../../../../shared/services/api/layers-api.service";

import { SideBars, LocalLoading } from "../../../../global";

import { InformationalIcons } from "./informational-icons";
import { LayersGroup } from "./layers-group";

export const LayersSideBar: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [layers, setLayers] = useState<Dictionary<ILayers[]>>();
    const [selectedLayer, setSelectedLayer] = useState<string>();

    const { setShouldOpen, shouldOpen } = useLayersSideBar();

    const handleSelectedLayer = (layerName: string) => {
        setSelectedLayer(layerName);
    };

    const fetchLayers = useCallback(async () => {
        try {
            setLoading(true);
            const layersResponse = await LayersApiService.getLayers(
                `where={"cam_ativa_webgeo":"true"}&orderBy=ASC:cam_desc_webgeo&`,
                "relations=group,styles"
            );

            const groupedLayers = groupBy(
                layersResponse.data,
                "group.grpcam_nome"
            );

            setLayers(groupedLayers);
        } finally {
            setLoading(false);
        }
    }, []);

    const renderLayers = useCallback(() => {
        if (layers) {
            return (
                <div className="divide-y divide-slate-200 py-2">
                    {Object.entries(layers)
                        .sort((a, b) => (a[0] > b[0] ? 1 : -1))
                        .map(([group, groupedLayers]) => (
                            <LayersGroup
                                key={group}
                                doAfterSelectLayer={handleSelectedLayer}
                                layers={groupedLayers}
                                group={group}
                                selectedLayer={selectedLayer}
                            />
                        ))}
                </div>
            );
        }
        return <p>Nenhuma camada habilitada</p>;
    }, [layers, selectedLayer]);

    useEffect(() => {
        fetchLayers();
    }, [fetchLayers]);

    return (
        <SideBars handleClose={() => setShouldOpen(false)} show={shouldOpen}>
            <div className="overflow-auto" style={{ maxHeight: "100%" }}>
                <InformationalIcons />
                {loading ? <LocalLoading /> : renderLayers()}
            </div>
        </SideBars>
    );
};

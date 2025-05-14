import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Id } from "react-toastify";
import { FiChevronDown } from "react-icons/fi";

import { unByKey } from "ol/Observable";
import { EventsKey } from "ol/events";
import { TileWMS } from "ol/source";

import { Layer } from "ol/layer";
import { Modal, ZoomImage } from "../../../../global";
import { Switch } from "../../../../global/switch";
import { showToast, closeToast } from "../../../../global/toast";

import { useOlMap } from "../../../../../shared/hooks/useOlMap";
import { StoragesService } from "../../../../../shared/storages/storages.service";
import {
    findLayerByTitle,
    getLayerLegend,
    removeDrawInteraction,
} from "../../../../../shared/utils/ol.utils";
import { storageConstants } from "../../../../../shared/utils/storage.utils";
import { useLoading } from "../../../../../shared/hooks/useLoading";
import { useAuth } from "../../../../../shared/hooks/useAuth";
import { ILayers } from "../../../../../shared/interfaces/ILayers";

import { PropertyInfo } from "../../properties/property-info";
import { LayersInfo } from "./layer-info";
import { LayersStyles } from "./layer-styles";
import { useToggle } from "../../../../../shared/hooks/useToggle";
import { IBGEInfo } from "../../ibge/IBGEInfo";
import { PgvInfo } from "../../pgv_info";
import { ZoneamentoPgv } from "../../zoneamento_pgv";
import { ConstructionMap } from "../../construction-map";

type LayerRowProps = ILayers & {
    doAfterSelectLayer(layer: string): void;
    selectedLayer?: string;
};

type ModalTypes = {
    type:
        | "propertyInfo"
        | "faceDeQuadra"
        | "social"
        | "standard"
        | "propertyInfoEmpty"
        | "IBGEInfo"
        | "PGVInfo"
        | "ZoneamentoInfo"
        | "ConstructionsMap";
    keyParam:
        | string
        | number
        | { subscription: string; geomId?: number; facade?: string };
};

export const LayerRow: React.FC<LayerRowProps> = ({
    cam_nome_geoserver,
    cam_desc_webgeo,
    doAfterSelectLayer,
    styles,
    selectedLayer,
}) => {
    const switchRef = useRef<HTMLInputElement>(null);
    const { setLoading } = useLoading();
    const { map } = useOlMap();
    const { user } = useAuth();
    const { isActive, toggle } = useToggle();

    const [singleClickKey, setSingleClickkey] = useState<EventsKey>();
    const [toastId, setToastId] = useState<Id>();
    const [legendToastId, setLegendToastId] = useState<Id>();
    const [showModal, setShowModal] = useState<ModalTypes>();

    const [layerVisible, setLayerVisible] = useState<boolean>(() => {
        const layers = StoragesService.localStorage.getValue(
            storageConstants.ENABLED_LAYERS(user.id)
        );

        return layers ? JSON.parse(layers).includes(cam_nome_geoserver) : false;
    });

    const handleLayersInfo = (
        feature: Record<string, Record<string, unknown> | string>
    ) => {
        const {
            inscricao,
            cdn_url,
            descr,
            cdn_url_fachada,
            inscricaoimobiliaria,
        } = feature.properties as Record<string, unknown>;

        const geomId = (feature.id as string).split(".");

        const { lotes_id } = feature.properties as Record<string, number>;

        const { betha_i_im } = feature.properties as Record<string, number>;

        if (betha_i_im && cam_nome_geoserver.match("lotes")) {
            setShowModal({
                keyParam: {
                    subscription: `${betha_i_im}` as string,
                    geomId: geomId.length > 1 ? +geomId[1] : undefined,
                    facade: cdn_url_fachada as string,
                },
                type: "propertyInfo",
            });

            return;
        }

        if (cam_nome_geoserver.match("MAPEAMENTO_OBRAS")) {
            setShowModal({
                keyParam: JSON.stringify(feature.properties),
                type: "ConstructionsMap",
            });

            return;
        }
        if (cam_nome_geoserver.match("zon_pgv_jcz_valor_pgv_2023")) {
            setShowModal({
                keyParam: JSON.stringify(feature.properties),
                type: "ZoneamentoInfo",
            });

            return;
        }
        if (cam_nome_geoserver.match("valor_pgv_2023")) {
            setShowModal({
                keyParam: JSON.stringify(feature.properties),
                type: "PGVInfo",
            });

            return;
        }

        if (cam_nome_geoserver.match("IBGE")) {
            setShowModal({
                keyParam: JSON.stringify(feature.properties),
                type: "IBGEInfo",
            });

            return;
        }

        if (inscricao && cam_nome_geoserver.match("lotes")) {
            setShowModal({
                keyParam: {
                    subscription: inscricao as string,
                    geomId: geomId.length > 1 ? +geomId[1] : undefined,
                    facade: cdn_url_fachada as string,
                },
                type: "propertyInfo",
            });

            return;
        }
        if (lotes_id && cam_nome_geoserver.match("view_lotes")) {
            if (inscricaoimobiliaria) {
                setShowModal({
                    keyParam: {
                        subscription: inscricaoimobiliaria as string,
                        geomId: lotes_id,
                        facade: cdn_url_fachada as string,
                    },
                    type: "propertyInfo",
                });
            } else {
                setShowModal({
                    keyParam: {
                        subscription: "" as string,
                        geomId: lotes_id,
                        facade: "" as string,
                    },
                    type: "propertyInfoEmpty",
                });
            }
            return;
        }

        if (cdn_url) {
            setShowModal({
                keyParam: cdn_url as string,
                type: "faceDeQuadra",
            });
            return;
        }

        if (descr && (descr as string).match("social")) {
            // TODO: social castro
        }

        setShowModal({
            keyParam: JSON.stringify(feature.properties),
            type: "standard",
        });
    };

    const removeFetchLayerInfo = useCallback(() => {
        // remove o evento single click
        if (singleClickKey) {
            unByKey(singleClickKey);
            setSingleClickkey(undefined);
        }

        // fecha o toast
        if (toastId) {
            closeToast(toastId);
            setToastId(undefined);
        }
    }, [singleClickKey, toastId]);

    const activeFetchLayerInfo = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!map) return;

        removeDrawInteraction(map);

        if (!event.currentTarget.checked) {
            removeFetchLayerInfo();
            return;
        }

        if (!layerVisible) {
            event.preventDefault();
            showToast({
                message: `Para ativar a busca de dados relacinados a camada ${cam_desc_webgeo} habilite a visualização da mesma`,
                type: "warn",
                options: { position: "top-center" },
            });

            return;
        }

        setToastId(
            showToast({
                type: "info",
                message: `A visualização dos dados da camada ${cam_desc_webgeo} está ativa.`,
                options: {
                    autoClose: false,
                    position: "top-center",
                },
            })
        );

        // ativar recuperacao de informacoes da camada
        const layerToFetchInfo = map
            ? findLayerByTitle(map, cam_nome_geoserver)
            : undefined;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const layerSource = layerToFetchInfo?.getSource() as any;

        // ativa listener de single click no mapa
        const key = map?.on("singleclick", async (evt) => {
            const viewResolution = map?.getView().getResolution();

            // gera url para request
            const url: string | undefined = layerSource?.getFeatureInfoUrl(
                evt.coordinate,
                viewResolution,
                "EPSG:3857",
                { INFO_FORMAT: "application/json" }
            );

            if (url) {
                try {
                    setLoading(true);
                    const {
                        data,
                    }: {
                        data: {
                            features: Record<string, Record<string, unknown>>[];
                        };
                    } = await axios.get(url);

                    const [feature] = data.features;

                    handleLayersInfo(feature);
                } catch {
                    showToast({
                        type: "error",
                        message: "Ops, algo deu errado, features",
                    });
                } finally {
                    setLoading(false);
                }
            }
        });

        // envia para o componente pai a layer selecionada
        doAfterSelectLayer(cam_nome_geoserver);

        // salva o evento gerado para remover posteriormente
        setSingleClickkey(key);
    };

    const layerLegend = (
        layer?: Layer,
        display?: boolean,
        styleName?: string
    ) => {
        if (!display) {
            if (legendToastId) closeToast(legendToastId);

            return;
        }

        getLayerLegend(layer?.getSource(), styleName).then((res) => {
            if (!res.length) return;

            const legendId = showToast({
                type: "info",
                message: (
                    <div className="text-sm text-slate-900 max-h-80 overflow-y-auto">
                        <p className="font-medium">
                            Legendas: {cam_desc_webgeo}
                        </p>
                        <div className="flex flex-row items-center flex-wrap overflow-y-auto">
                            {res.map(({ title, fill, stroke }) => (
                                <div className="flex flex-row items-center">
                                    <span
                                        className="w-4 h-4 rounded ml-2 mr-2 p-0 text-slate-900"
                                        style={{
                                            backgroundColor: `${fill}`,
                                            borderWidth: "1px",
                                            borderColor: stroke || "black",
                                        }}
                                    />
                                    <span>{title || "Padrão"}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ),
                options: {
                    closeButton: true,
                    autoClose: false,
                    closeOnClick: false,
                    position: "bottom-right",
                    icon: false,
                },
            });

            setLegendToastId(legendId);
        });
    };

    const toggleLayerVisibility = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setLayerVisible(event.currentTarget.checked);

        const layerToChange = map
            ? findLayerByTitle(map, cam_nome_geoserver)
            : undefined;

        const storageInfo = StoragesService.localStorage.getValue(
            storageConstants.ENABLED_LAYERS(user.id)
        );

        const savedLayers: string[] = storageInfo
            ? JSON.parse(storageInfo)
            : [];

        const currentLayerIsSaved = savedLayers.findIndex(
            (layerName) => layerName === cam_nome_geoserver
        );

        if (currentLayerIsSaved >= 0 && !event.currentTarget.checked) {
            savedLayers.splice(currentLayerIsSaved, 1);
        }

        if (currentLayerIsSaved < 0) {
            savedLayers.push(cam_nome_geoserver);
        }

        StoragesService.localStorage.set(
            storageConstants.ENABLED_LAYERS(user.id),
            JSON.stringify(savedLayers)
        );

        layerLegend(layerToChange, event.currentTarget.checked);

        layerToChange?.setVisible(event.currentTarget.checked);
    };

    const changeLayerOpacity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const layerToChange = map
            ? findLayerByTitle(map, cam_nome_geoserver)
            : undefined;

        layerToChange?.setOpacity(parseInt(event.target.value, 10) / 100);
    };

    const changeLayerStyle = async (styleName: string) => {
        const layerToChange = map
            ? findLayerByTitle(map, cam_nome_geoserver)
            : undefined;

        const layerSource = layerToChange?.getSource();

        layerLegend(layerToChange, true, styleName);

        if (layerSource instanceof TileWMS) {
            layerSource.updateParams({ STYLES: styleName });
        }
    };

    useEffect(() => {
        if (
            selectedLayer !== cam_nome_geoserver &&
            switchRef.current &&
            switchRef.current.checked
        ) {
            switchRef.current.checked = false;
        }
    }, [selectedLayer, cam_nome_geoserver, removeFetchLayerInfo]);

    const renderModal = useCallback(() => {
        if (!showModal) {
            return null;
        }

        function renderBasedOnType(modalType: ModalTypes) {
            switch (modalType.type) {
                case "propertyInfo": {
                    const { subscription, geomId, facade } =
                        modalType.keyParam as {
                            subscription: string;
                            geomId: number;
                            facade?: string;
                        };
                    return (
                        <PropertyInfo
                            subscription={subscription}
                            geomId={geomId}
                            facade={facade}
                        />
                    );
                }

                case "propertyInfoEmpty": {
                    const { geomId } = modalType.keyParam as {
                        geomId: number;
                    };
                    return (
                        <PropertyInfo
                            subscription=""
                            geomId={geomId}
                            facade=""
                        />
                    );
                }

                case "faceDeQuadra": {
                    return <ZoomImage image={modalType.keyParam as string} />;
                }

                case "IBGEInfo": {
                    return (
                        <IBGEInfo
                            info={JSON.parse(modalType.keyParam as string)}
                        />
                    );
                }

                case "PGVInfo": {
                    return (
                        <PgvInfo
                            info={JSON.parse(modalType.keyParam as string)}
                        />
                    );
                }
                case "ConstructionsMap": {
                    return (
                        <ConstructionMap
                            info={JSON.parse(modalType.keyParam as string)}
                        />
                    );
                }

                case "ZoneamentoInfo": {
                    return (
                        <ZoneamentoPgv
                            info={JSON.parse(modalType.keyParam as string)}
                        />
                    );
                }

                default:
                    return (
                        <LayersInfo
                            info={JSON.parse(modalType.keyParam as string)}
                        />
                    );
            }
        }

        return (
            <Modal
                show={!!showModal}
                handleCloseModal={() => {
                    setShowModal(undefined);
                }}
                title="INFORMAÇÕES"
                size="xl"
            >
                {renderBasedOnType(showModal)}
            </Modal>
        );
    }, [showModal]);

    return (
        <div
            className={`flex flex-nowrap space-x-4 px-2 items-center h-10 hover:bg-slate-100/90 rounded mx-2 ${
                layerVisible ? "bg-teal-50/90" : "text-slate-700"
            }`}
        >
            {renderModal()}

            <div className="flex-none w-14 self-center flex items-center">
                <Switch
                    name="layer-info"
                    onChange={activeFetchLayerInfo}
                    ref={switchRef}
                />
            </div>

            <input
                className="flex-none w-10"
                type="checkbox"
                onChange={toggleLayerVisibility}
                checked={layerVisible}
            />

            <div className="flex-initial w-64 relative">
                <button
                    id="dropdownRadioButton"
                    className={`break-word self-center flex-initial font-medium text-sm inline-flex items-center ${
                        layerVisible
                            ? "text-teal-800 scale-105"
                            : "text-slate-700"
                    }`}
                    type="button"
                    disabled={!styles?.length}
                    onClick={toggle}
                >
                    {cam_desc_webgeo}
                    {!!styles?.length && <FiChevronDown />}
                </button>
                <LayersStyles
                    layerName={cam_nome_geoserver}
                    styles={styles}
                    doAfterSelectStyle={changeLayerStyle}
                    visible={isActive}
                />
            </div>

            <input type="range" onChange={changeLayerOpacity} />
        </div>
    );
};

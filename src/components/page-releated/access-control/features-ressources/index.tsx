/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Scope } from "@unform/core";
import { keyBy } from "lodash";
import { IFeatures } from "../../../../shared/interfaces/IFeatures";
import { FeaturesApiService } from "../../../../shared/services/api/features-api.service";
import { ApiErrorHandler } from "../../../../shared/utils/errors.utils";
import { LocalLoading, Checkbox, Input } from "../../../global";
import { updateArray } from "../../../../shared/utils/arrays.utils";

import { FeatureAndRessourcesProps } from "./interfaces";

import { ActionsLabels } from "./utils";

export const FeatureAndRessources: React.FC<FeatureAndRessourcesProps> = ({
    parentScope,
    featuresLabels,
    ressourcesLabels,
    formRef,
    roleAllowedFeatures,
}) => {
    const [loading, setLoading] = useState(true);
    const [features, setFeatures] = useState<IFeatures[]>([]);

    const [showRessources, setShowRessources] = useState<number[]>([]);

    const hasRessources = useCallback(
        (feature: IFeatures) =>
            !!(feature.ressources.length && ressourcesLabels),
        [ressourcesLabels]
    );

    const setActionsCheckbox = useCallback(
        (
            { feat_nome }: IFeatures,
            checked: boolean,
            actions: string[] | "*"
        ) => {
            const featuresActions = featuresLabels[feat_nome]?.actions;
            if (!formRef || !featuresActions) return;

            const filteredActions =
                actions === "*"
                    ? featuresActions
                    : featuresActions.filter((action) =>
                          actions.includes(action)
                      );

            filteredActions.forEach((action) => {
                formRef.current?.setFieldValue(
                    `${parentScope}.${feat_nome}.actions.${action}`,
                    checked ? "true" : "false"
                );
            });
        },
        [formRef, parentScope, featuresLabels]
    );

    const setRessourceCheckbox = useCallback(
        ({ feat_nome }: IFeatures, ressourceId: number, checked: boolean) => {
            if (!formRef) return;

            formRef.current?.setFieldValue(
                `${parentScope}.${feat_nome}.ressources.${ressourceId}`,
                checked ? "true" : "false"
            );
        },
        [formRef, parentScope]
    );

    const onFeatureInputChange =
        (feature: IFeatures) => (event: ChangeEvent<HTMLInputElement>) => {
            if (!formRef) return;

            const isChecked = event.currentTarget.checked;

            feature.ressources.forEach(({ feat_res_id }) =>
                setRessourceCheckbox(feature, feat_res_id, isChecked)
            );

            setActionsCheckbox(feature, isChecked, "*");
        };

    const checkAllowedFeatures = useCallback(() => {
        const featureKeyBy = keyBy(features, "id");

        roleAllowedFeatures?.forEach(
            ({ actions, featureDetails, ressources }) => {
                const feature = featureKeyBy[featureDetails.id];

                if (!feature) return;

                setActionsCheckbox(feature, true, actions);

                feature.ressources.forEach((res) => {
                    setRessourceCheckbox(
                        feature,
                        res.feat_res_id,
                        ressources === "*" ||
                            ressources.some(({ id }) => id === res.feat_res_id)
                    );
                });
            }
        );
    }, [
        roleAllowedFeatures,
        setActionsCheckbox,
        setRessourceCheckbox,
        features,
    ]);

    useEffect(() => {
        checkAllowedFeatures();
    }, [checkAllowedFeatures]);

    const fetchFeatures = useCallback(async () => {
        try {
            const featuresReponse = await FeaturesApiService.get();

            const filteredFeatures = featuresReponse.filter(
                (feature) => featuresLabels[feature.feat_nome]
            );

            const sortedFeatures = filteredFeatures.sort(
                (a, b) =>
                    featuresLabels[a.feat_nome].order -
                    featuresLabels[b.feat_nome].order
            );

            setFeatures(sortedFeatures);
        } catch (err) {
            ApiErrorHandler(err);
        } finally {
            setLoading(false);
        }
    }, [featuresLabels]);

    useEffect(() => {
        fetchFeatures();
    }, [fetchFeatures]);

    if (loading) return <LocalLoading />;

    return (
        <div className="flex space-y-5 flex-col">
            {features.map((feature) => (
                <Scope
                    path={feature.feat_nome}
                    key={feature.feat_nome + feature.id}
                >
                    <div className="bg-white rounded-md border border-gray-200 shadow-xl py-6 px-4 grid grid-cols-4 gap-4">
                        <Scope path="details">
                            <Input
                                hidden
                                value={feature.id}
                                name="featId"
                                readOnly
                            />
                            <Input
                                readOnly
                                hidden
                                value={
                                    hasRessources(feature) ? "true" : "false"
                                }
                                name="hasRessources"
                            />
                        </Scope>
                        <Scope path="feature">
                            {hasRessources(feature) && ressourcesLabels ? (
                                <Checkbox
                                    name={feature.id.toString()}
                                    label={
                                        featuresLabels[feature.feat_nome].label
                                    }
                                    onChange={onFeatureInputChange(feature)}
                                />
                            ) : (
                                <p className="m-0">
                                    {featuresLabels[feature.feat_nome].label}
                                </p>
                            )}
                        </Scope>
                        <div className="col-span-2 justify-self-center flex flex-row space-x-5">
                            <Scope path="actions">
                                {featuresLabels[feature.feat_nome].actions.map(
                                    (action) => (
                                        <Checkbox
                                            key={feature.feat_nome + action}
                                            style={{
                                                marginLeft: "10px",
                                                color: "teal",
                                            }}
                                            name={action}
                                            label={ActionsLabels[action]}
                                        />
                                    )
                                )}
                            </Scope>
                        </div>
                        <div className="justify-self-end">
                            {hasRessources(feature) && (
                                <button
                                    onClick={() =>
                                        setShowRessources(
                                            updateArray(
                                                feature.id,
                                                showRessources
                                            )
                                        )
                                    }
                                    type="button"
                                >
                                    Mostrar
                                </button>
                            )}
                        </div>

                        <Scope path="ressources">
                            {hasRessources(feature) &&
                                feature.ressources.map(
                                    ({ ressource, feat_id, feat_res_id }) => (
                                        <div
                                            key={`${feat_id} - ${feat_res_id}`}
                                            style={{ marginLeft: "10px" }}
                                            className={
                                                !showRessources.includes(
                                                    feat_id
                                                )
                                                    ? "hidden"
                                                    : ""
                                            }
                                        >
                                            {feature.id === 8 ? (
                                                <Checkbox
                                                    name={feat_res_id.toString()}
                                                    label={`${
                                                        (
                                                            ressourcesLabels as Record<
                                                                string,
                                                                string
                                                            >
                                                        )[ressource.res_nome]
                                                    } - ${
                                                        (
                                                            ressourcesLabels as Record<
                                                                string,
                                                                string
                                                            >
                                                        )[
                                                            ressource
                                                                .res_proveniente
                                                        ]
                                                    }`}
                                                />
                                            ) : (
                                                <Checkbox
                                                    name={feat_res_id.toString()}
                                                    label={
                                                        (
                                                            ressourcesLabels as Record<
                                                                string,
                                                                string
                                                            >
                                                        )[ressource.res_nome]
                                                    }
                                                />
                                            )}
                                            {/* <Checkbox
                                                name={feat_res_id.toString()}
                                                label={`${
                                                    (
                                                        ressourcesLabels as Record<
                                                            string,
                                                            string
                                                        >
                                                    )[ressource.res_nome]
                                                } - ${
                                                    (
                                                        ressourcesLabels as Record<
                                                            string,
                                                            string
                                                        >
                                                    )[ressource.res_proveniente]
                                                }`}
                                            /> */}
                                        </div>
                                    )
                                )}
                        </Scope>
                    </div>
                </Scope>
            ))}
        </div>
    );
};

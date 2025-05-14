import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { EventsForm } from "../../../../components/page-releated/agenda/events";

export const AgendaEvent = () => {
    const [loading, setLoading] = useState(false);

    const handleOnClick = () => {
        setLoading(!loading);
    };
    const doAfterReset = () => {
        setLoading(!loading);
    };
    return (
        <>
            <div dir="rtl">
                <div className="relative h-20 w-20">
                    <Button className="btn-prmary" onClick={handleOnClick}>
                        NOVO
                    </Button>
                </div>
            </div>
            {loading && (
                <div className="relative h-1/2 w-1/3">
                    <EventsForm doAfterReset={doAfterReset} />
                </div>
            )}

            <div> </div>
        </>
    );
};

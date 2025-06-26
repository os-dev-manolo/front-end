import moment from "moment";

export const handleNavigate = (
    date: Date,
    currentView: string,
    setDateRange: React.Dispatch<
        React.SetStateAction<{ start: Date; end: Date }>
    >
) => {
    let start: Date;
    let end: Date;

    if (currentView === "month") {
        start = moment(date).startOf("month").subtract(1, "week").toDate();
        end = moment(date).endOf("month").add(1, "week").toDate();
    } else if (currentView === "week") {
        start = moment(date).startOf("week").subtract(3, "days").toDate();
        end = moment(date).endOf("week").add(3, "days").toDate();
    } else {
        start = moment(date).startOf("day").toDate();
        end = moment(date).endOf("day").toDate();
    }

    setDateRange({ start, end });
};

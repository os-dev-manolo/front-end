import {
    MdOutlineVisibility,
    MdOutlineInfo,
    MdDriveFileRenameOutline,
    MdOutlineOpacity,
} from "react-icons/md";

import { Tooltip } from "../../../../global";

export const InformationalIcons: React.FC = () => {
    return (
        <div className="z-10 flex flex-1 flex-nowrap space-x-4 px-2 items-center h-10 sticky top-0 py-4 bg-white">
            <Tooltip text="INFORMAÇÕES DAS CAMADAS">
                <div className="w-14 flex justify-center">
                    <MdOutlineInfo color="teal" size={25} />
                </div>
            </Tooltip>
            <Tooltip text="ATIVAR CAMADAS">
                <div className="w-14 flex justify-center">
                    <MdOutlineVisibility color="teal" size={30} />
                </div>
            </Tooltip>
            <Tooltip text="NOME DAS CAMADAS">
                <div className="flex-initial w-64 flex justify-center">
                    <MdDriveFileRenameOutline color="teal" size={25} />
                </div>
            </Tooltip>
            <Tooltip text="OPACIDADE DAS CAMADAS">
                <div className="w-32 flex justify-center">
                    <MdOutlineOpacity color="teal" size={25} />
                </div>
            </Tooltip>
        </div>
    );
};

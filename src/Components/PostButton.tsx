import { ReactNode } from "react";

export const PostButton = ({
  icon,
  value,
  onClickEvent,
}: {
  icon: ReactNode;
  value?: number;
  onClickEvent?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  //include local state based on server values => active, setActive<boolean>
  return (
    <div className="inline-flex ml-4 ">
      <button className="h-6 w-6" onClick={onClickEvent}>
        {icon}
      </button>
      {value}
    </div>
  );
};

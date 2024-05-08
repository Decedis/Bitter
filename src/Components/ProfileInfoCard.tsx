import { useEffect, useState } from "react";
import { User } from "../types";
import { usePatchUserProfilePicture } from "../services/mutations";
import { useUser } from "../services/queries";
import { axiosInstance } from "../services/fetcher";
import { useAuth } from "../Providers/FakeAuthProvider";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";

export const ProfileInfoCard = ({
  userName,
  profilePicture,
  id,
}: Omit<User, "password">) => {
  const [isEditPicture, setIsEditPicture] = useState(false);
  const [pictureURL, setPictureURL] = useState("");
  const userQuery = useUser();
  const { user } = useAuth();
  const { trigger: patchUserProfilePictureTrigger } =
    usePatchUserProfilePicture();
  const navigate = useNavigate();

  useEffect(() => {
    setPictureURL(profilePicture);
  }, [profilePicture]);

  const handleUserPatch = () => {
    patchUserProfilePictureTrigger(
      {
        id: id,
        profilePicture: pictureURL,
      },
      {
        optimisticData: userQuery.data && [
          ...userQuery.data,
          { profilePicture: pictureURL },
        ],
        rollbackOnError: true,
      }
    );
  };

  const handleURLChange = async (newURL: string) => {
    try {
      const response = await axiosInstance.head(newURL);
      if (response.status >= 200 && response.status < 300) {
        setPictureURL(newURL);
        console.log("Valid URL");
      } else {
        console.log("Invalid image URL");
        setPictureURL(profilePicture);
      }
    } catch (error) {
      console.error("Error checking image URL:", error);
    }
  };

  const updateLocalStorage = () => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const updatedUserData = { ...userData, profilePicture: pictureURL };
      const updatedUserDataString = JSON.stringify(updatedUserData);
      localStorage.setItem("user", updatedUserDataString);
    }
  };

  /*
  https://blog.bear.app/wp-content/uploads/2018/10/bear-icon.png
  https://i5.walmartimages.com/asr/e803a1cd-d96b-4b29-82d3-c77d829bd69b_1.c3f1756a7ee2ce319a9cd0752ba086b3.jpeg
  */

  return (
    <>
      <div className="border-2 border-purple-400 p-4 mb-4 mt-4 flex gap-2 rounded-md">
        <div className="hover:border-2 hover:border-sky-400 rounded-xl">
          <img
            className="w-16 h-16 rounded-xl cursor-pointer "
            src={profilePicture}
            alt=""
            onClick={() => {
              user?.id === id
                ? setIsEditPicture((prev) => (prev === true ? false : true))
                : console.log("action restricted");
            }}
          />
        </div>
        <h2>username: {userName}</h2>
      </div>
      {isEditPicture ? (
        <form
          className="mb-4 p-2 z-10 bg-red-500 text-white w-full rounded-md"
          key={id}
          onSubmit={(e) => {
            e.preventDefault();

            handleUserPatch();
            updateLocalStorage();
            navigate(0);
            setIsEditPicture(false);
          }}
        >
          <label htmlFor="edit picture">Picture url</label>
          <input
            className="bg-slate-100 text-purple-400 w-full"
            type="text"
            name="edit picture"
            id="editPicture"
            value={pictureURL}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleURLChange(e.target.value)
            }
          />
          <button
            className="btn btn-ghost absolute bottom-2 right-2"
            type="submit"
          >
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      ) : (
        <div></div>
      )}
    </>
  );
};

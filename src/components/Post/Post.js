import {
  React,
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useContext,
} from "react";
import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import { savePost } from "../../services/usePostServices";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import UserLogo from "../../assets/OIP.png";
import Flashcard from "../FlashCard";
import useHttpClient from "../../hooks/http-hook/private-http-hook";
// import TimeAgo from "../../shared/components/TimeAgo";
const cx = classNames.bind(styles);

function Post({ post, isSavedPage, handleRemovePost }) {

    const { privateRequest } = useHttpClient();

    const [flashCard, setFlashCard] = useState([]);
    const [username, setUsername] = useState("");

    const [imageIndex, setImageIndex] = useState(0);
    const [isFirstImage, setIsFirstImage] = useState(true);
    const [isLastImage, setIsLastImage] = useState(false);

    const [saving, setSaving] = useState(false)
    const [isSaved, setIsSaved] = useState(post.isSaved)

    //Notify
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarNotif, setSnackBarNotif] = useState({
        severity: "success",
        message: "This is success message!",
    }); //severity: success, error, info, warning

    useEffect(() => {
        if (post && post.flash_card) {
            setFlashCard(post.flash_card || []);
            setUsername(post.creator.username)
        }
        console.log('isSavedPage:',isSavedPage);
        console.log('Post:', post); // Kiểm tra xem post có giá trị đúng không
        console.log('flashCard:', post.creator.username); // Kiểm tra xem post có giá trị đúng không
    }, [post]);

    function showNextImage() {
        setImageIndex((index) => {
        if (index === flashCard?.length - 2) {
            setIsLastImage(true);
            setIsFirstImage(false);
            return flashCard?.length - 1;
        } else {
            setIsLastImage(false);
            setIsFirstImage(false);
            return index + 1;
        }
        });
    }

    function showPrevImage() {
        setImageIndex((index) => {
        if (index === 1) {
            setIsLastImage(false);
            setIsFirstImage(true);
            return 0;
        } else {
            setIsLastImage(false);
            setIsFirstImage(false);
            return index - 1;
        }
        });
    }

    const handleSavePost = async () => {
        if (!saving) {
        let message;
        try {
            setSaving(true);
            const response = await savePost(
                post.id,
                !isSaved,
                privateRequest
            );
            if (response.message) {
                setIsSaved(!isSaved);
            if (!isSaved) message = "Save post success!";
            else {
                message = "Remove post success!";
                handleRemovePost();
            } 
            setSnackBarNotif({
                severity: "success",
                message: message,
            });

            setSnackBarOpen(true);
            }
        } catch (err) {
            if (!isSaved) message = "Save post fail!";
            else message = "Remove post fail!";
            setSnackBarNotif({
            severity: "error",
            message: message,
            });
            setSnackBarOpen(true);
        } finally{
            setSaving(false);
        }
        }
    };


    return (
        <div className={cx("post")}>
        <div className={cx("post__header")}>
            <div className={cx("post__headerAuthor")}>
            <div
                style={{
                marginRight: 10,
                position: "inherit",
                textDecoration: "none",
                color: "inherit",
                }}
            >
                <img
                style={{ width: "30px", height: "30px", padding: "5px", borderRadius: "50%", border:"0.5px solid grey" }}
                src={UserLogo}
                alt=""
                />
            </div>
            &nbsp;
            <div
                style={{
                marginRight: 5,
                position: "inherit",
                textDecoration: "none",
                color: "black",
                }}
            >
                {username}
            </div>
            {/* <span style={{color: "black"}}>•</span>
            <span style={{color: "black"}}>
                20h
                <TimeAgo type="short" created_at={post.created_at} />
            </span> */}
            </div>
        </div>
        <div className={cx("post__image")}>
            <div className={cx("image-post")} style={{}}>
            {flashCard?.map((card, index) => (
                <div
                key={index}
                className={cx("img-post-slider")}
                style={{
                    width: "100%",
                    height: "110%",
                    minHeight: "180px",
                    transform: `translateX(-${100 * imageIndex}%)`,
                    transition: "transform 0.2s",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: "0",
                    flexGrow: "0",
                    borderRadius: "0px 0px 0px 10px",
                }}
                // aria-hidden={imageIndex !== index}
                >
                    
                        <Flashcard flashcard={card}
                            style={{
                                color:"red",
                            width: "100%",
                            objectFit: "contain",
                            height: "300px",
                            // height: "auto",
                            display: "block",
                            flexShrink: "0",
                            flexGrow: "0",
                            borderRadius: "0px 0px 10px 10px",
                            }}
                            // src={image}
                        />
                   
                {isFirstImage === true || flashCard.length === 1 ? null : (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                    <button
                        onClick={showPrevImage}
                        className={cx("img-post-slider-btn")}
                        style={{ left: 10 }}
                        aria-label="View Previous Image"
                    >
                        <ArrowBackIosNewIcon
                        style={{
                            width: "16px",
                            height: "16px",
                            marginBottom: "2px",
                        }}
                        aria-hidden
                        />
                    </button>
                    </div>
                )}
                {isLastImage === true || flashCard.length === 1 ? null : (
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    >
                    <button
                        onClick={showNextImage}
                        className={cx("img-post-slider-btn")}
                        style={{ right: 10 }}
                        aria-label="View Next Image"
                    >
                        <ArrowForwardIosIcon
                        style={{
                            width: "16px",
                            height: "16px",
                            marginBottom: "2px",
                        }}
                        aria-hidden
                        />
                    </button>
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        <div className={cx("post__footer")}>
            <div className={cx("post__footerIcons")} style={{ width: "97%" }}>
            <div className={cx("post__iconsMain")}>
                <div className={cx("postIcon")} >
                </div>
            </div>
            <div className={cx("post__iconSave")}>
                <div
                    onClick={handleSavePost}
                    style={{ padding: "7px 0px 7px 7px", marginRight: "5%" }}
                    className={cx("postIcon")}
                >   
                    {saving ? (
                        <CircularProgress size={10} />
                    ) : isSaved ? (
                        <BookmarkAddedIcon />
                    ) : (
                        <BookmarkBorderIcon />
                    )}
                </div>
            </div>
            </div>
        </div>
        <Snackbar
            open={snackBarOpen}
            autoHideDuration={6000}
            onClose={(event, reason) => {
            setSnackBarOpen(false);
            }}
        >
            <Alert
            onClose={(event, reason) => {
                setSnackBarOpen(false);
            }}
            severity={snackBarNotif.severity}
            sx={{ width: "100%" }}
            >
            {snackBarNotif.message}
            </Alert>
        </Snackbar>
    </div>
    )
};
export default Post;
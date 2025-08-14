import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import classNames from "classnames/bind";
import styles from "./HomePage.module.scss";
import Sidenav from "../../components/Sidenav";
import Post from "../../components/Post";
import PostLoading from "../../components/PostLoading";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import { createPost, getHomePosts } from "../../services/usePostServices";
import useHttpClient from "../../hooks/http-hook/private-http-hook";


const cx = classNames.bind(styles);
function HomePage() {
    const { privateRequest } = useHttpClient();

    const [page, setPage] = useState(1);
    // const { loadMoreLoading, hasMore } = useLoadMorePosts(page);
    const [ postLoading, setPostLoading ] = useState(false);
    const [ posts, setPosts ] = useState([]);

    //Notify
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarNotif, setSnackBarNotif] = useState({
        severity: "success",
        message: "This is success message!",
    }); //severity: success, error, info, warning

    const [modalCreate, setModalCreate] = useState(false);
    const [flashCards, setFlashCards] = useState([{question: "", answer: ""}, {question: "", answer: ""}])
    const [question, setQuestion] = useState(flashCards.map(card => card.question));
    const [answer, setAnswer] = useState(flashCards.map(card => card.answer));
    const [creating, setCreating] = useState(false);
    const toggleModalCreate = () => {
        setQuestion("");
        setAnswer("");
        setFlashCards([{question: "", answer: ""}, {question: "", answer: ""}]);
        setModalCreate(!modalCreate);
    };

    const allQuestionsFilled = () => {
        return flashCards.every(card => card.question.trim() !== "" && card.answer.trim() !== "");
    };

    // Add new question
    const addQuestion = () => {
        const newCard = { question: "", answer: "" }; // Tạo một thẻ mới
        const newFlashCard = [...flashCards, newCard]; // Thêm thẻ mới vào mảng
        setFlashCards(newFlashCard); // Cập nhật trạng thái flashCards
        setQuestion(newFlashCard.map(card => card.question));
        setAnswer(newFlashCard.map(card => card.answer)); // Cập nhật trạng thái questions
    };

    const handleCreate = async () => {
        try {
            setCreating(true);
            if(!allQuestionsFilled()){
                setSnackBarNotif({
                severity: "error",
                message: "Vui lòng điền đầy đủ thông tin...",
                });
                setSnackBarOpen(true);
                console.log(flashCards)}
            else{
                const postData = { flashCards };
                const response = await createPost(postData, privateRequest);
                if (response) {
                    toggleModalCreate();
                    setSnackBarNotif({
                        severity: "success",
                        message: "Create succees!"   
                    });
                    setSnackBarOpen(true);
                }
            }
        } catch (err) {
            toggleModalCreate();
            console.log("get posts error: ", err);
        } finally {
            getPosts();
            setCreating(false);
        }
    };

    const getPosts = useCallback(async () => {
        try {
            setPostLoading(true);
            const data = await getHomePosts(1, 10, privateRequest);

            const postsCount = data.posts.length;

            if (postsCount > 0 && page === 1) 
                console.log(data.posts);
                setPosts(data.posts);
            } catch (err) {
            console.error(err);
        } finally{
            setPostLoading(false)
        }
    }, []);

    useEffect(() => {
        if (page === 1) getPosts();
    }, []);
    


    return (
        <div className={cx("homepage")}>
            <div className={cx("homepage__navWraper")}>
                <Sidenav />
            </div>
            <div className={cx("homepage__timeline")}>
                <div className={cx("page_content")} style={{ marginTop: 20 }}>
                    <div
                        style={{
                        position: "absolute",
                        right: "5%",
                        top: "40px",
                        }}
                    >
                        <div
                        style={{
                            display: "flex",
                            marginBottom: 10,
                        }}
                        >
                            <div
                                onClick={() => setModalCreate(true)}
                                style={{
                                backgroundColor: "#0095f6",
                                padding: "10px",
                                color: "white",
                                borderRadius: "10px",
                                cursor: "pointer",
                                marginRight: 10,
                                }}
                            >
                                Create
                            </div>
                        </div>
                    </div>
                    <div className={cx("all-title")}>
                        <div className={cx("title")}>
                            <h6 className={cx("text")}>FLASH CARD</h6>
                        </div>
                    </div>
                    <div className={cx("page_content__body")}>
                        <div className={cx("students")}>  
                        {postLoading ? (
                            <div>
                                <PostLoading/>
                                <PostLoading/>
                            </div>
                        ) : posts.length > 0 ? (
                            posts.map((post, i) => (
                                <Post post={post} key={i}/>
                        ))
                        ) : (
                            <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                                            Helvetica, Arial, sans-serif`,
                                color: "rgb(61 60 60)",
                            }}
                            >
                            Không có dữ liệu
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            {modalCreate && (
                <div className={cx("modal active-modal")}>
                <div
                    onClick={toggleModalCreate}
                    className={cx("overlay")}
                    style={{ alignSelf: "flex-end" }}
                >
                    <CloseIcon
                    className={cx("sidenav__icon")}
                    style={{
                        width: "27px",
                        height: "27px",
                        color: "white",
                        margin: "12px 30px",
                        position: "absolute",
                        right: "0",
                        cursor: "pointer",
                    }}
                    />
                </div>
                <div className={cx("modal-navbar-content")} style={{ width: "80%" }}>
                    <div className={cx("modal-header")}>
                    Create
                    <div
                        onClick={addQuestion}
                        style={{
                        position: "absolute",
                        right: "10px",
                        top: "5px",
                        display: "inline-block",
                        borderRadius: "10px",
                        cursor: "pointer",
                        }}
                    >
                        <AddCircleOutlineOutlinedIcon
                            style={{ width: 30, height: 30 }}
                        />
                    </div>
                    </div>
                    <div className={cx("modal-main")}>
                        {flashCards.map((card, i) => (<div style={{width: "100%"}}>
                            <div
                                style={{
                                width: "100%",
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                }}
                            >
                                <div className={cx("modal-main-title")} style={{ display: "flex", justifyContent: "space-between" }}>Question {i + 1}:
                                    <div style={{ right: 0 }}>
                                        {flashCards.length>2}
                                        <DeleteIcon
                                            style={flashCards.length>2 ? { width: 20, height: 20, right: 0, cursor: "pointer", } : { width: 20, height: 20, right: 0, color: "grey" }}
                                            alt={"Remove"}
                                            onClick={() => {
                                                if (flashCards.length > 2) {
                                                    const newFlashCards = flashCards.filter((_, index) => index !== i);
                                                    setFlashCards(newFlashCards);
                                                    setQuestion(newFlashCards.map(card => card.question));
                                                    setAnswer(newFlashCards.map(card => card.answer));
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <textarea
                                className={cx("modal-main-input")}
                                value={question[i]}
                                onChange={(e) => {
                                    const newQuestions = [...question]; // Tạo bản sao của mảng câu hỏi
                                    newQuestions[i] = e.target.value; // Cập nhật câu hỏi tương ứng
                                    setQuestion(newQuestions); // Cập nhật trạng thái

                                    // Cập nhật flashCards
                                    const newFlashCards = [...flashCards];
                                    newFlashCards[i].question = e.target.value; // Cập nhật câu hỏi trong flashCards
                                    setFlashCards(newFlashCards); // Cập nhật trạng thái flashCards
                                }}
                                placeholder="Question..."
                                ></textarea>
                            </div>
                            <div
                                style={{
                                width: "100%",
                                display: "flex",
                                marginBottom: "20px",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                }}
                            >
                                <textarea
                                className={cx("modal-main-input")}
                                value={answer[i]}
                                onChange={(e) => {
                                    const newAnswers = [...answer]; // Tạo bản sao của mảng câu hỏi
                                    newAnswers[i] = e.target.value; // Cập nhật câu hỏi tương ứng
                                    setAnswer(newAnswers); // Cập nhật trạng thái

                                    // Cập nhật flashCards
                                    const newFlashCards = [...flashCards];
                                    newFlashCards[i].answer = e.target.value; // Cập nhật câu hỏi trong flashCards
                                    setFlashCards(newFlashCards); // Cập nhật trạng thái flashCards
                                }}
                                placeholder="Answer..."
                                ></textarea>
                            </div>
                        </div>))}
                        
                    
                        <div
                            className={cx("modal-main-button")}
                            style={{
                            position: "relative",
                            }}
                        >
                            <Button
                            sx={{
                                fontFamily: "inherit",
                                textTransform: "none",
                                ":hover": {
                                opacity: 0.8,
                                },
                                opacity: creating ? 0.5 : 1,
                            }}
                            onClick={handleCreate}
                            disabled={creating}
                            >
                            Create
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            )}
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
}
export default HomePage;
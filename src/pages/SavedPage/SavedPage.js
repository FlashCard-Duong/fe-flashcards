import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import classNames from "classnames/bind";
import styles from "./SavedPage.module.scss";
import Sidenav from "../../components/Sidenav";
import Post from "../../components/Post";
import PostLoading from "../../components/PostLoading";
import { getSavedPosts } from "../../services/usePostServices";
import useHttpClient from "../../hooks/http-hook/private-http-hook";

const cx = classNames.bind(styles);
function SavedPage() {
    const { privateRequest } = useHttpClient();

    const [page, setPage] = useState(1);
    // const { loadMoreLoading, hasMore } = useLoadMorePosts(page);
    const [ postLoading, setPostLoading ] = useState(false);
    const [ posts, setPosts ] = useState([]);


    const getPosts = useCallback(async () => {
        try {
            setPostLoading(true);
            const data = await getSavedPosts(
                page,
                15,
                privateRequest
            );

            if (data) {
                const postsCount = data.saved_posts.length;

                if (postsCount > 0 && page === 1) setPosts(data.saved_posts);
            }
        } catch (err) {
            console.error("profile saved posts ", err);
        } finally {
            setPostLoading(false)
        }
    }, []);

    useEffect(() => {
        if (page === 1) getPosts();
    }, []);

    const handleRemovePost = async (postId) => {
        // Cập nhật state để xóa bài viết khỏi danh sách
        setPosts(posts.filter(post => post._id !== postId));
    };

    return (
        <div className={cx("homepage")}>
            <div className={cx("homepage__navWraper")}>
                <Sidenav />
            </div>
            <div className={cx("homepage__timeline")}>
                <div className={cx("page_content")} style={{ marginTop: 20 }}>
                    <div className={cx("all-title")}>
                        <div className={cx("title")}>
                            <h6 className={cx("text")}>SAVED CARD</h6>
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
                                    <Post post={post} isSavedPage={true} handleRemovePost={() => handleRemovePost(post._id)} key={i}/>
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
        </div>
    )
}
export default SavedPage;
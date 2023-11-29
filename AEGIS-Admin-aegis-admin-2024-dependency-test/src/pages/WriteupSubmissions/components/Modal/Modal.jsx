import React, { useState, useEffect } from "react";
import exit from "./assets/exit.png";
import Button from "../../../../components/Button";
import Spinner from "../../../../components/Spinner";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import { Accounts, Writeups } from "../../../../services";
import { useMutation, queryCache } from "react-query";
import { Users } from "../../../../services";

import {
  ModalContainer,
  ModalCard,
  ModalHeader,
  ModalExit,
  ModalHeaderRow,
  ModalHeaderTitle,
  ModalHeaderInfo,
  ModalHeaderLabel,
  ModalHeaderText,
  ModalHeaderTextBold,
  ModalHeaderTextItalic,
  ModalFooter,
  ModalFooterContent,
  ModalBody,
  WriteupWrapper,
  WriteupLabel,
  WriteupContent,
  WriteupBody,
  Line,
  Comment,
  CommentHeader,
  CommentDateTime,
  CommentText,
  CommentRow,
} from "./styles";
import TableStatus from "../../../../components/Status";

const Modal = ({ changeStatusHandler, selectedWriteup, setSelectedWriteup, onExit }) => {
  const [user, setUser] = useState();
  const [addComment, setAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  // const [filteredComments, setFilteredComments] = useState([]);
  const [commentsOfModal, setCommentsOfModal] = useState([]);
  const data = selectedWriteup && selectedWriteup[0];
  // const { data: comments, refetch: commentsFetch } = useQuery(
  //   "comments",
  //   Writeups.getWriteupComments,
  //   {
  //     refetchOnWindowFocus: false,
  //     enabled: false, // turned off by default, manual refetch is needed
  //   }
  // );

  console.log(selectedWriteup)

  useEffect(() => {
    // Fetch a user
    Accounts.me().then((data) => setUser(data));

    // Fetch Comments
  }, []);

  useEffect(() => {
    setNewComment(data?.writeup?.comment || "");
  }, [data])

  // useEffect(() => {
  //   comments &&
  //     setFilteredComments(
  //       comments.filter((comment) => comment.writeup.id === data.writeup.id)
  //     );
  // }, [comments]);

  // useEffect(() => {
  //   // Fetch the comments
  //   for (const comment of filteredComments) {
  //     Users.single(comment.user).then((user) => {
  //       setCommentsOfModal([...commentsOfModal, {
  //         name: user?.full_name,
  //         date: format(parseISO(comment.date), "MMM dd, yyyy"),
  //         time: format(parseISO(comment.date), "h:mm a"),
  //         commentText: comment.comment,
  //       }]);
  //     });
  //   }
  // }, [selectedWriteup, filteredComments]);

  const submitCommentHandler = async () => {
    // Writeups.postComment({
    //   writeup_id: data.writeup.id,
    //   comment: newComment,
    // }).then((resp) => {
    //   console.log(resp);
    //   commentsFetch();
    //   setAddComment(false);
    // });
    await Writeups.updateWriteup({
      ...data.writeup,
      comment: newComment
    });

    const editedWriteup = selectedWriteup
    editedWriteup[0].writeup.comment = newComment
    setSelectedWriteup(editedWriteup)
    setAddComment(!addComment);
  };

  const approveHandler = async () => {
    // Backend change
    const writeup = await Writeups.getWriteup(data.writeup.id);
    await Writeups.updateWriteup({
      id: data.writeup.id,
      status: "approved",
      will_write: writeup.will_write,
      content: writeup.content,
      data: writeup.data,
    });
    // Frontend change
    changeStatusHandler(data.writeup.id, "approved");
    onExit();
  };

  const declineHandler = async () => {
    // Backend change
    const writeup = await Writeups.getWriteup(data.writeup.id);
    await Writeups.updateWriteup({
      id: data.writeup.id,
      status: "declined",
      will_write: writeup.will_write,
      content: writeup.content,
      data: writeup.data,
    });
    // Frontend change
    changeStatusHandler(data.writeup.id, "declined");
    onExit();
  };

  return (
    <ModalContainer onClick={onExit}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalExit src={exit} onClick={onExit} />
        <ModalHeader>
          <ModalHeaderRow>
            <ModalHeaderTitle>
              {data && data.full_name ? data.full_name : ""}
            </ModalHeaderTitle>
            <TableStatus
              type={
                data && data.writeup.status == "pending"
                  ? "default"
                  : data && data.writeup.status == "approved"
                  ? "success"
                  : "failure"
              }
              text={data && data.writeup.status}
            />
          </ModalHeaderRow>
          <ModalHeaderRow>
            <ModalHeaderInfo>
              <ModalHeaderLabel>ID Number</ModalHeaderLabel>
              <ModalHeaderText>
                {data && data.username ? data.username : ""}
              </ModalHeaderText>
            </ModalHeaderInfo>
            <ModalHeaderInfo>
              <ModalHeaderLabel>Mobile</ModalHeaderLabel>
              <ModalHeaderText>
                {data && data.mobile_number ? data.mobile_number : ""}
              </ModalHeaderText>
            </ModalHeaderInfo>
            <ModalHeaderInfo>
              <ModalHeaderLabel>Status</ModalHeaderLabel>
              <ModalHeaderText className="capitalize">
                {data && data.writeup.status ? data.writeup.status : ""}
              </ModalHeaderText>
            </ModalHeaderInfo>
          </ModalHeaderRow>
          <ModalHeaderRow>
            <ModalHeaderInfo>
              <ModalHeaderLabel>Email Address</ModalHeaderLabel>
              <ModalHeaderText>
                {data && data.email ? data.email : ""}
              </ModalHeaderText>
            </ModalHeaderInfo>
          </ModalHeaderRow>
        </ModalHeader>
        <ModalBody>
          <WriteupWrapper>
            <WriteupLabel>Writeup Submission</WriteupLabel>
            <WriteupContent>{data && data.writeup.content}</WriteupContent>
            {/* <WriteupContent> */}
            {/* <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                children={data && data.writeup.content}
                            /> */}
            {/* <WriteupBody>{data && data.writeup.content}</WriteupBody> */}
            {/* <ReactMde /> */}
            {/* </WriteupContent> */}
          </WriteupWrapper>
          <WriteupWrapper>
            <WriteupLabel>Comment</WriteupLabel>
            <Line></Line>
            {data?.writeup?.comment && (
              <Comment>{data?.writeup?.comment}</Comment>
            )}
            {/* {commentsOfModal.map(comment => {
              return (
                <>
                  <Comment>
                    <CommentHeader>{comment.name}</CommentHeader>
                    <CommentDateTime>
                      {comment.date} {comment.time}
                    </CommentDateTime>
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      children={comment.commentText}
                    />
                    <CommentText>{comment}</CommentText>
                  </Comment>
                  <Line />
                </>
              );
            })} */}
            {addComment ? (
              <WriteupWrapper>
                {/* <CommentHeader>{user && user?.user.full_name}</CommentHeader> */}
                <ReactMde
                  value={newComment}
                  onChange={(value) => setNewComment(value)}
                />
                <CommentRow>
                  <Button
                    reverse={false}
                    type="button"
                    label="Save Comment"
                    onClick={submitCommentHandler}
                  />
                  <Button
                    reverse={true}
                    type="button"
                    label="Cancel"
                    className="comment"
                    onClick={() => setAddComment(!addComment)}
                  />
                </CommentRow>
              </WriteupWrapper>
            ) : (
              <WriteupWrapper>
                <Button
                  reverse={true}
                  type="button"
                  label={data?.writeup?.comment ? "Edit Comment" : "Add Comment"}
                  className="comment"
                  onClick={() => setAddComment(!addComment)}
                />
              </WriteupWrapper>
            )}
          </WriteupWrapper>
        </ModalBody>
        <ModalFooter>
          {data?.writeup.status && data?.writeup.status == "pending" ? (
            <ModalFooterContent>
              <Button
                type="button"
                reverse={true}
                label="Decline"
                onClick={declineHandler}
              />
              <Button
                type="button"
                reverse={false}
                label="Approve"
                onClick={approveHandler}
              />
            </ModalFooterContent>
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalCard>
    </ModalContainer>
  );
};

export default Modal;

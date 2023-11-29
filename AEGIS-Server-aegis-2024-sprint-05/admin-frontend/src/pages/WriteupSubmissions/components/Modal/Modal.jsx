import React, { useState } from 'react';
import exit from './assets/exit.png';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import { useQuery } from "react-query";
import { format, parseISO } from "date-fns";
import { Accounts, Writeups } from "../../../../services";

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
    CommentRow
} from './styles';
import TableStatus from '../../../../components/Status'

const Modal = ({ users, selectedWriteup, onExit }) => {
    const { data: user } = useQuery('me', {queryFn: Accounts.me})
    var data = selectedWriteup && selectedWriteup[0]
    const { data: comments } = useQuery(
        'comments', 
        Writeups.getWriteupComments,
    )

    var filteredComments = comments && comments.filter((comment) => comment.writeup.id === data.writeup.id)
    
    const [addComment, setAddComment] = useState(false);
    const [newComment, setNewComment] = useState(null);

    const submitCommentHandler = () => {
        Writeups.postComment({
            writeup_id: data.writeup.id,
            comment: newComment
        }).then((resp) => {
            console.log(resp)
        })
        setAddComment(false);
    }

    const approveHandler = () => {
        Writeups.updateWriteup(data.writeup.id, {
            status: "approved"
        })
    }

    const declineHandler = () => {
        Writeups.updateWriteup(data.writeup.id, {
            status: "declined"
        })
    }

    return (
        <ModalContainer>
            <ModalCard>
                <ModalExit src={exit} onClick={onExit} />
                <ModalHeader>
                    <ModalHeaderRow>
                        <ModalHeaderTitle>{data && data.full_name ? data.full_name : ""}</ModalHeaderTitle>
                        <TableStatus type={data && data.writeup.status == "pending" ? "default" : data && data.writeup.status == "approved" ? "success" : "failure"} text={data && data.writeup.status} />
                    </ModalHeaderRow>
                    <ModalHeaderRow>
                        <ModalHeaderInfo>
                            <ModalHeaderLabel>ID Number</ModalHeaderLabel>
                            <ModalHeaderText>{data && data.username ? data.username : ""}</ModalHeaderText>
                        </ModalHeaderInfo>
                        <ModalHeaderInfo>
                            <ModalHeaderLabel>Mobile</ModalHeaderLabel>
                            <ModalHeaderText>{data && data.mobile_number ? data.mobile_number : ""}</ModalHeaderText>
                        </ModalHeaderInfo>
                        <ModalHeaderInfo>
                            <ModalHeaderLabel>Status</ModalHeaderLabel>
                            <ModalHeaderText className="capitalize">{data && data.writeup.status ? data.writeup.status : ""}</ModalHeaderText>
                        </ModalHeaderInfo>
                    </ModalHeaderRow>
                    <ModalHeaderRow>
                        <ModalHeaderInfo>
                            <ModalHeaderLabel>Email Address</ModalHeaderLabel>
                            <ModalHeaderText>{data && data.email ? data.email : ""}</ModalHeaderText>
                        </ModalHeaderInfo>
                    </ModalHeaderRow>
                </ModalHeader>
                <ModalBody>
                    <WriteupWrapper>
                        <WriteupLabel>Writeup Submission</WriteupLabel>
                        <WriteupContent>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={data && data.writeup.content} />
                            {/* <WriteupBody>{data && data.writeup.content}</WriteupBody> */}
                            {/* <ReactMde /> */}
                        </WriteupContent>
                    </WriteupWrapper>
                    <WriteupWrapper>
                        <WriteupLabel>Comments</WriteupLabel>
                        <Line></Line>
                        {
                            filteredComments && filteredComments
                            ?
                                filteredComments.map((comment) => {
                                    var user = users && users.find((user) => user.id === comment.user)
                                    var name = user && user.full_name
                                    var date = format(parseISO(comment.date), "MMM dd, yyyy")
                                    var time = format(parseISO(comment.date), "h:mm a")
                                    var comment = comment.comment
                                    return (
                                        <>
                                            <Comment>
                                                <CommentHeader>{name}</CommentHeader>
                                                <CommentDateTime>{date} {time}</CommentDateTime>
                                                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={comment} />
                                                {/* <CommentText>{comment}</CommentText> */}
                                            </Comment>
                                            <Line />
                                        </>
                                    )
                                })
                            :
                                <Spinner />
                        }
                        {
                            addComment
                            ?
                                <WriteupWrapper>
                                    <CommentHeader>{user && user?.user.full_name}</CommentHeader>
                                    <ReactMde 
                                        value={newComment || ""}
                                        onChange={(value) => setNewComment(value)}
                                    />
                                    <CommentRow>
                                        <Button reverse={false} type="button" label="Save Comment" onClick={submitCommentHandler} /> 
                                        <Button reverse={true} type="button" label="Cancel" className="comment" onClick={() => setAddComment(!addComment)} /> 
                                    </CommentRow>
                                </WriteupWrapper>
                            :
                                <WriteupWrapper>
                                    <Button reverse={true} type="button" label="+ Add Comment" className="comment" onClick={() => setAddComment(!addComment)} /> 
                                </WriteupWrapper>
                        }
                    </WriteupWrapper>
                </ModalBody>
                <ModalFooter>
                    {
                        data.writeup.status && data.writeup.status == "pending"
                        ?
                        <ModalFooterContent>
                            <Button type="button" reverse={true} label="Decline" onClick={declineHandler} />
                            <Button type="button" reverse={false} label="Approve" onClick={approveHandler} />
                        </ModalFooterContent>
                        :
                        <></>
                    }
                </ModalFooter>
            </ModalCard>
        </ModalContainer>
    )
};

export default Modal;
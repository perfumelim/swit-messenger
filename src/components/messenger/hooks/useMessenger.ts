import React, { useState } from "react";
import { IMessage } from "types/message";
import MockMessages from "utils/data.json";
import { getCurrentDate } from "utils/date";
import { useSelector } from "react-redux";
import { userSelecter } from "stores/user";

export default function useMessenger() {
  const [messages, setMessages] = useState<IMessage[]>(MockMessages.messages);
  const [content, setContent] = useState<string>("");
  const { userId, profileImage, userName } = useSelector(userSelecter);

  const onSendMessage = () => {
    if (content.trim().length === 0) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        userId,
        userName,
        profileImage,
        date: getCurrentDate(),
        content: content,
      },
    ]);
    setContent("");
  };

  const onSubmitMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSendMessage();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.key === "Enter" ? onSendMessage() : console.log(null);
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onDeleteMessage = (messageId: number) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  return {
    messages,
    content,
    onChangeMessage,
    onSendMessage,
    onDeleteMessage,
    onKeyPress,
    onSubmitMessage,
  };
}

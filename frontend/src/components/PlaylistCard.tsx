import React from "react";

interface PlaylistCardProps {
  cover: string;
  title: string;
  subtitle: string;
  description: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ cover, title, subtitle, description }) => (
  <div>
    <img src={cover.startsWith('/images/') ? cover : `/images/${cover}`} alt={title} />
    <div>{title}</div>
    <div>{subtitle}</div>
    <div>{description}</div>
  </div>
);

export default PlaylistCard;

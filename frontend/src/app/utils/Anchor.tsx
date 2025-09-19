interface AnchorProps {
  hrefAnchor: string;
}
export const Button = ({ hrefAnchor }: AnchorProps) => {
  return <a href={hrefAnchor}></a>;
};

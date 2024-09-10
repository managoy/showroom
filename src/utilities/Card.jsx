import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBCardFooter,
  MDBIcon,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Card({
  title,
  to,
  description,
  subheading,
  disabled,
  image,
  language,
}) {
  return (
    <MDBCard
      className="h-100 custom-hover-shadow "
      style={{ border: "1px solid rgba(0, 0, 0, 0.5)" }}
    >
      <div className="mx-3 mt-n3 bg-image hover-zoom shadow-4-strong rounded-6">
        <Link to={disabled ? "/" : to}>
          <MDBCardImage
            src={`/${image}`}
            position="top"
            alt="..."
            className="w-100"
          />
        </Link>
      </div>
      <MDBCardBody>
        <MDBCardTitle>{title}</MDBCardTitle>
        <p className="text-muted">
          <small>
            <MDBIcon fas icon="info-circle" />{" "}
            <span className="ms-1">{subheading}</span>
          </small>
        </p>
        <MDBCardText>{description}</MDBCardText>
      </MDBCardBody>
      <MDBCardFooter border="0">
        <Link to={disabled ? "/" : to}>
          <MDBBtn
            href={disabled ? "/" : to}
            color="secondary"
            rounded
            disabled={disabled ? true : false}
            className={disabled ? "not-allowed-cursor" : ""}
          >
            Explore
          </MDBBtn>
        </Link>
      </MDBCardFooter>
    </MDBCard>
  );
}

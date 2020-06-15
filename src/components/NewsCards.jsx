import React from "react";
import { Col, Card, Spinner } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router";

export default function NewsCards(props) {
  const history = useHistory();

  // onclick of card redirecting to new route(newsDetail)
  const redirectingToNewPage = (newsInforamation) => {
    props.newsDetail(newsInforamation)
    history.push({
      pathname: "/newsDetail",
    });
    
  };
  return (
    <>
    {/* Displays the newsInformation in Card format */}
      {props.newsInformation.length > 0 ? (
        <>
          {props.newsInformation.map((newsInforamation, i) => {
            let publishedDate = moment(newsInforamation.publishedAt).format("D MMMM YYYY");
            return (
              <Col xs={3} key={i}>
              <Card
                className="news-card"
                key={i}
                onClick={() => redirectingToNewPage(newsInforamation)}
              >
                <Card.Header>
                  <Card.Img
                    variant="top"
                    src={newsInforamation.urlToImage}
                    alt="newsImage"
                  />
                  </Card.Header>
                  <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    {publishedDate}
                  </Card.Subtitle>
                  <Card.Title>{newsInforamation.title}</Card.Title>
                  <Card.Text>{newsInforamation.author}</Card.Text>
                  <Card.Text>{newsInforamation.content}</Card.Text>
                  <Card.Link
                    href={`https://${newsInforamation.source.name}`}
                    target="_blank"
                  >
                    {newsInforamation.source.name}
                  </Card.Link>
                </Card.Body>
                </Card>
              </Col>
            );
          })}
        </>
      ) : (
        // if the reponse from Api is late the this will be loaded
        <div className="spinner">
        <Spinner animation="border" role="status" >
          <span className="sr-only">Loading...</span>
        </Spinner>
        </div>
      )}
    </>
  );
}

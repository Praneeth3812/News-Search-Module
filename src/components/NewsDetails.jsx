import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

class NewsDetails extends Component {
  moveToPreviousPage = () => {
    this.props.history.push("/homepage");
  };

  render() {  

    let newsDetails = !!this.props.newsList ? this.props.newsList : []

    if(newsDetails.length === 0) {
       this.moveToPreviousPage();
    }
    
    return (
      // Displays the information regarding the news selected
        <Container>
        <div className="news-card-detail">
        <div>
        <button
              type="button"
              className="btn btn-link"
              onClick={this.moveToPreviousPage}
            >
          <i
            className="fa fa-arrow-left fa-2x"
            aria-hidden="true"
            onClick={this.moveToPreviousPage}
          ></i>
           </button>
        </div>
        <h2>{newsDetails.title}</h2>
        <div>
            <p>{newsDetails.publishedAt} / {newsDetails.author} / { newsDetails.source ? newsDetails.source.name : ""} / {newsDetails.url}</p>
        </div>
        <div className="news-card-img">
          <img src={newsDetails.urlToImage} alt="newsCardImage" />
        </div>
        <div className="info-box">
          <h3>Content : </h3>
          <p>{newsDetails.content}</p>
        </div>
        <div  className="info-box">
          <h3>Description :</h3>
          <p>{newsDetails.description}</p>
        </div>
        <div className="info-box">
          <h3>PublishedAt:</h3>
          <p>{newsDetails.publishedAt}</p>
        </div>
        <div className="info-box">
          <h3>Url:</h3>
          <a href={`https://${newsDetails.url}`} target="blank">
            {newsDetails.url}
          </a>
        </div>
        <Row className="align-items-center">
            <Col className="col-auto">
              <h3 className="author-name">Author :</h3>
            </Col>
            <Col>
              <p className="author-name">{newsDetails.author}</p>
            </Col>
          </Row>
        </div>
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsList : state.reducer.newsList
  };
};

export default connect(mapStateToProps)(NewsDetails);

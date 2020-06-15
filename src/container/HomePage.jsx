import React, { Component } from "react";
import { connect } from "react-redux";
import NewsCards from "../components/NewsCards";
import NewsSearchBar from "../components/NewsSearchBar";
import { actionGetNewsResponse } from "../actions/newsAction";
import {actionGetNewsDetail} from '../actions/newsDetailAction'
import SearchFilters from "./SearchFilters";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsInformation: [],
      selectedAuthorName: "",
      filteredData: [],
      formatedDate: "",
      selectedDate: "",
      siteData: [],
      selectedSiteName: null,
      
      filterClicked: false,
    };
  }

  componentDidMount() {

    this.props.actionGetNewsResponse().then(() => {
      this.setState({ newsInformation: this.props.newsData.articles }, () => {
        this.siteNameDropDownData();
      });
    });
  }

  //Options for Site DropDown
  siteNameDropDownData = () => {
    const newsInformation = [...this.state.newsInformation];
    let newsItems = newsInformation.map((newsItem) => {
      return {
        value: newsItem.source.name,
        label: newsItem.source.name,
      };
    });

    this.setState({ siteData: newsItems });
  };


  //Filtered News 
  sortedNewsDetails = (searchValue) => {
    const newsInformation = [...this.state.newsInformation];
    let filterednews = newsInformation.filter( (item)=> {
      let searchItem = Object.values(item)
      return searchItem.map( (value)=> {
          return JSON.stringify(value);
        })
        .find( (value) => {
          return value.includes(searchValue);
        });
    });
    this.setState({ filteredData: filterednews });
  }; 


  //Getting Value of date
  onDateChange = (date) => {
    let formatedDate = moment(date).format("YYYY-MM-DD");
    this.setState({ selectedDate: date, formatedDate }, () => this.sortedNewsList());
  };

  //filtered news
  sortedNewsList = () => {
    let newsInformation = [...this.state.newsInformation];

    const { formatedDate, selectedSiteName, selectedAuthorName } = this.state;

    if (formatedDate && formatedDate !== "Invalid date") {
      newsInformation = newsInformation.filter((item) =>moment(item.publishedAt).format("YYYY-MM-DD").includes(this.state.formatedDate));
    } else if (selectedSiteName)
    newsInformation = newsInformation.filter((item) => {
        return item.source.name === selectedSiteName.value;
      });
    else if (selectedAuthorName.trim())
    newsInformation = newsInformation.filter((item) => {
        return item.author
          ? item.author.toLowerCase().includes(selectedAuthorName.toLowerCase())
          : "";
      });

    this.setState({ filteredData: newsInformation });
    return newsInformation;
  };

  //Getting Value of Authorname
  onAuthorNameChange = ({ target }) => {
    this.setState({ selectedAuthorName: target.value }, () => this.sortedNewsList());
  };

  // Value for Sitename
  onSiteNameChange = (site) => {
    this.setState(
      {
        selectedSiteName: site,
      },
      () => this.sortedNewsList()
    );
  };
// passing the newsItem to the news Detail
  newsDetail = (news) => {
    this.props.actionGetNewsDetail(news);
  };

  render() {

    const { filterClicked, newsInformation, filteredData } = this.state;

    return (
      <>
        <Container>
          <Row className="news-search-row">
            <Col className="pr-0">
            {/* Displays the SearchBar */}
              <NewsSearchBar filternews={this.sortedNewsDetails} />
            </Col>
            <Col className="col-auto">
              <button
                type="button"
                className="btn btn-light filter-btn"
                onClick={() => {
                  this.setState({ filterClicked: true });
                }}
              >
              {/* FIlter Icon */}
                <i className="fa fa-filter" aria-hidden="true"></i>
                Filters
              </button>
            </Col>
            <Col xs={12}>
              {filterClicked ? (
                <div className="filter-info">
                {/* Displays the Filters */}
                  <SearchFilters
                    newsInformation={newsInformation}
                    selectedDate={this.state.selectedDate}
                    onDateChange={this.onDateChange}
                    onAuthorNameChange={this.onAuthorNameChange}
                    selectedAuthorName={this.state.selectedAuthorName}
                    siteData={this.state.siteData}
                    selectedSiteName={this.state.selectedSiteName}
                    onSiteNameChange={this.onSiteNameChange}
                    closeFilter={() => {
                      this.setState({ filterClicked: false });
                    }}
                  />
                </div>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="news-card-row">
          {/* Displays the newsCards */}
            <NewsCards
              newsInformation={filteredData.length > 0 ? filteredData : newsInformation}
              newsDetail={this.newsDetail}
            />
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newsData: state.reducer.newsInformation,
  };
};

export default connect(mapStateToProps, {
  actionGetNewsResponse,
  actionGetNewsDetail,
})(HomePage);

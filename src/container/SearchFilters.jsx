import React from "react";
import DatePicker from "react-datepicker";
import ReactSelect from "react-select";
import { Row, Col, InputGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

class Filters extends React.Component {
  state = {
    newsInformation: this.props.newsInformation,
  };

 
  render() {
    return (
      <>
          <Row className="pb-2">
          <Col>Filters</Col>
          <Col className="col-auto">
            <button 
              type="button" 
              className="btn btn-link"
              onClick={this.props.closeFilter}
            >
            {/* Close Icon */}
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={3}>
            <InputGroup>
            {/* DatePicker  */}
          <DatePicker
            placeholderText="Published date"
            selected={this.props.selectedDate}
            onChange={this.props.onDateChange}
            dateFormat=" yyyy-MM-d"
            isClearable
          />
        

        <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={12} sm={3}>
          {/* Input for authorName */}
            <InputGroup>
          <input
            type="text"
            id="authorName"
            placeholder="Author name"
            value={this.props.selectedAuthorName}
            onChange={this.props.onAuthorNameChange}
          />
         <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={12} sm={3}>
          {/* DropDown for Sitename */}
          <ReactSelect
            id="siteName"
            isClearable={true}
            isSearchable={false}
            options={this.props.siteData}
            placeholder="Site name"
            value={this.props.selectedSiteName}
            onChange={this.props.onSiteNameChange}
            displayValue="label"
            hideSelectedOptions={true}
            closeMenuOnSelect={true}
          />
        </Col>
        </Row>
      </>
    );
  }
}

export default Filters;

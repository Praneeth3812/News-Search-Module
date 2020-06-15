import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import { actionGetNewsResponse } from "../actions/newsAction";
import { connect } from "react-redux";
let languages = [];
function getData(data) {
  languages = data;
}
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// get suggestions while for input value
function getSuggestions(value, suggestion) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === "") {
    return [];
  }
  const regex = new RegExp("^" + escapedValue, "i");
  return languages
    .map((section) => {
      return {
        title: section.title ? section.title : section.url,
        languages: section.languages.filter((language) =>
          regex.test(language.name)
        ),
      };
    })
    .filter((section) => section.languages.length > 0);
}
// for getting the suggestion value
function getSuggestionValue(suggestion) {
  return suggestion.name;
}
// for displaying the suggestion under titles
function renderSuggestion(suggestion) {
  return suggestion.url ? (
    <span>{`${suggestion.name}, Url - ${suggestion.url}`}</span>
  ) : (
    
    <span>{`${suggestion.name}, name - ${suggestion.title}`}</span>
  );
}
// Displaying  section title
function renderSectionTitle(section) {
  return <strong>{section.title ? section.title : section.url}</strong>;
}
//gets the section Sugegstion
function getSectionSuggestions(section) {
  return section.languages;
}

class NewsSearchBar extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
    };
  }

  componentDidMount() {
    this.props.actionGetNewsResponse().then(() => {
      this.formateData(this.props.newsData);
    });
  }
// modifies the data 
  formateData = ({ articles }) => {
    const article = articles.map((data) => {
      const a = [];
      a.push({ name: data.author, title: data.title });
      return { title: "Authors", languages: a };
    });
    const data = articles.map((data) => {
      const a = [];
      a.push({ name: data.source.name, url: data.url });
      return { url: "Site name", languages: a };
    });
    const combinedArray = [...article, ...data];
    getData(combinedArray);
  };
//onchange of search bar
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue,
    });
    this.props.filternews(newValue);
  };
//after  suggestions fetched
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };
//if suggestions cleared
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "  Search here...",
      value,
      onChange: this.onChange,
    };

    return (
      <>
      {/* SearchBar with Auto Suggest */}
      <Autosuggest
        multiSection={true}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        inputProps={inputProps}
      />
      <span><i className="fa fa-search search-icon" aria-hidden="true" ></i></span>
      
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
})(NewsSearchBar);

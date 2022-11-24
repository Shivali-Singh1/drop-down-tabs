import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { getYears } from "./data";
import { useNavigate } from "react-router-dom";


const GET_MAKE_QUERY = gql`
  query GetMakeQuery($year: String!) {
    store {
      makes(year: $year) {
        key
        value
      }
    }
  }
`;

const GET_MODEL_QUERY = gql`
  query GetModelQuery($year: String!, $make: String!) {
    store {
      model(year: $year, make: $make) {
        key
        value
      }
    }
  }
`;

const GET_SUBMODEL_QUERY = gql`
  query GetSubModelQuery($year: String!, $make: String!, $model: String!) {
    store {
      submodel(year: $year, make: $make, model: $model) {
        key
        value
      }
    }
  }
`;

const GET_ENGINE_QUERY = gql`
  query GetEngineQuery(
    $year: String!
    $make: String!
    $model: String!
    $submodel: String!
  ) {
    store {
      engine(year: $year, make: $make, model: $model, submodel: $submodel) {
        key
        value
      }
    }
  }
`;

const App = () => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [submodel, setSubmodel] = useState("");
  const [engine, setEngine] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/selected", { state: { year, make, model, submodel, engine } });
  };

  const { loading, error, data } = useQuery(GET_MAKE_QUERY, {
    variables: { year: year, make: "" },
  });

  const {
    data: modelData,
    loading: modelLoading,
    error: modelError,
  } = useQuery(GET_MODEL_QUERY, {
    variables: {
      year: year,
      make: make,
    },
  });

  const {
    data: submodelData,
    loading: submodelLoading,
    error: submodelError,
  } = useQuery(GET_SUBMODEL_QUERY, {
    variables: {
      year: year,
      make: make,
      model: model,
    },
  });

  const {
    data: engineData,
    loading: engineLoading,
    error: engineError,
  } = useQuery(GET_ENGINE_QUERY, {
    variables: {
      year: year,
      make: make,
      model: model,
      submodel: submodel,
    },
  });
  return (
    <form>
      Select the Car Model:
      <br />
      <br />
      <br />
      <label htmlFor="cars"> Year : </label>
      <select
        name="year"
        id="year"
        onChange={(e) => {
          setYear(e.target.value);
        }}
      >
        <option value=""></option>
        {getYears.map((option) => (
          <option key={"key"} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <label htmlFor="cars"> Make : </label>
      <select
        name="make"
        id="make"
        onChange={(e) => {
          setMake(e.target.value);
          // $make: e.target.value;
        }}
      >
        <option value=""></option>
        {data?.store.makes.map((option) => (
          <option key={"key1"} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <label htmlFor="cars"> Model</label>
      <select
        name="model"
        id="model"
        onChange={(e) => {
          setModel(e.target.value);
        }}
      >
        <option value=""></option>
        {modelData?.store.model.map((option) => (
          <option key={"key2"} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <label htmlFor="cars"> Sub-Model</label>
      <select
        name="sub-model"
        id="sub-model"
        onChange={(e) => {
          setSubmodel(e.target.value);
        }}
      >
        <option value=""></option>
        {submodelData?.store.submodel.map((option) => (
          <option key={"key3"} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <label htmlFor="cars"> Engine</label>
      <select
        name="engine"
        id="engine"
        onChange={(e) => {
          setEngine(e.target.value);
        }}
      >
        <option value=""></option>
        {engineData?.store.engine.map((option) => (
          <option key={"key3"} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Search</button>
    </form>
  );
};

export default App;

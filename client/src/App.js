import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const apiUrl = "http://timeapi.kaaylabs.com/api/v1/project_view/"
  const [data, setData] = useState({});

  async function getData(setData) {
    await fetch(apiUrl).then(response => response.json()).then((json) => setData(json));
  }

  useEffect(() => {
    getData(setData);
  }, [])

  console.log('blah', data);
  if (data && data.success === true) {
    const firstObj = data.data[0]
    return (
      <div>
        <table>
          <thead>
            <tr>
              {Object.keys(firstObj).map(key => {
                return (<td>{key}</td>)
              })}
            </tr>
          </thead>
          <tbody>
            {data.data.map(project_data => {
              return (
                <tr>
                  <td>{project_data.project_id}</td>
                  <td>{project_data.project_code}</td>
                  <td>{project_data.description}</td>
                  <td>{project_data.start_date}</td>
                  <td>{project_data.end_date}</td>
                  <td>{project_data.company_name}</td>
                  <td>{project_data.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please wait, fetching data!</h1>
      </div>
    )
  };
}

export default App;
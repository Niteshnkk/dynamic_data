// src/DynamicPage.jsx
import  { useEffect, useState } from 'react';
import jsonData from './data.json';
import "../src/DynamicPage.css"

const DynamicPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating fetching the data from the local JSON
    setData(jsonData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div className='hero-section'>
      <h1 className='data_title'>{data.title}</h1>
      <img src={data.project_image} alt={data.title} width="800px" />
      <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
      </div>
      
      
      <h2>Learning Outcomes</h2>
      <ul>
        {data.learning_outcomes.map((outcome, index) => (
          <li key={index}>{outcome}</li>
        ))}
      </ul>
      
      <h2>Pre-requisites</h2>
      <ul>
        {data.pre_requisites.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>Tasks</h2>
      {data.tasks.map((task) => (
        <div key={task.task_id}>
          <h3>{task.task_title}</h3>
          <p>{task.task_description}</p>
          <ul>
            {task.assets.map((asset) => (
              <li key={asset.asset_id}>
                <h4>{asset.asset_title}</h4>
                <p>{asset.asset_description}</p>
                {asset.asset_type === 'display_asset' && asset.asset_content_type === 'video' ? (
                  <iframe
                    src={asset.asset_content.trim()}
                    title={asset.asset_title}
                    width="400"
                    height="400"
                  ></iframe>
                ) : (
                  <a href={asset.asset_content.trim()}>{asset.asset_title}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DynamicPage;

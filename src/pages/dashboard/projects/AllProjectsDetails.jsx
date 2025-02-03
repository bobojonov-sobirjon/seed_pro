import { useTranslation } from 'react-i18next';
import { ProjectDetails } from '../../../components';
import AllProjectDetailCard from './components/AllProjectsCard';

// mock data
const AllProjectsDetails = () => {
  const { t } = useTranslation();

  const projects = [
    { id: 1, title: 'Название проекта', description: 'Описание проекта' },
  ];

  return (
    <div className='max-w-5xl mx-auto my-10'>
      {projects?.length > 0 && projects.map((project) => (
        <ProjectDetails
          key={project.id}
          title={project.title}
          description={project.description}
          isFavorite={false}
        />
      ))}
      <div className='my-14 flex flex-col gap-2'>
        <h2 className='text-2xl text-custom-gray font-gunterz'>
          {t("extraComponents.allProjectDetails.title")}
        </h2>
        <AllProjectDetailCard />
      </div>
    </div>
  );
};

export default AllProjectsDetails;

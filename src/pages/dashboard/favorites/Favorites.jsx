import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-tailwind/react';
import Details from './components/Details';
import { deleteOneFavorite, getAllFavorites, isLoading } from '../../../redux/reducers/projectReducer';

const Favorites = (props) => {
  const { t } = useTranslation();

  // get favorites
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetAllFavorites({ signal }); // get profile

    return () => controller.abort();
  }, []);

  // delete favorite
  const deleteItem = value => {
    props.onDeleteOneFavorite({ item: value });
  }

  return (
    <div className='max-w-5xl mx-auto my-10'>
      <div className='my-14 flex flex-col gap-8'>
        {/* <div>
          <h3 className='lg:text-2xl text-md font-bold uppercase text-custom-gray'>
            Избранное
          </h3>
        </div> */}
        {props.loading ? (
          <div className="max-w-full animate-pulse">
            <Typography
              as="div"
              variant="h1"
              className="mb-6 h-8 w-full rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-6 h-[155px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h1"
              className="mb-4 h-[155px] w-full rounded-xl bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
        ) : (
          <div>
            {props.allSelfProjects?.length === 0 ? (
              <div className=''>
                <h2 className='text-xl lg:text-2xl text-custom-gray font-gunterz mb-5'>
                  {t("dashboard.featured.not_data")}
                </h2>
              </div>
            ) : (
              <div>
                <div className='mb-6'>
                  <span className='font-gunterz text-xl lg:text-2xl text-custom-gray lg:text-left text-center block'>
                    {t("dashboard.featured.title")}
                  </span>
                </div>
                <Details
                  data={props.allFavorites}
                  deleteItem={deleteItem}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.projectReducer.loading,
    allFavorites: state.projectReducer.allFavorites,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoading: value => dispatch(isLoading(value)),
    onGetAllFavorites: value => dispatch(getAllFavorites(value)),
    onDeleteOneFavorite: value => dispatch(deleteOneFavorite(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

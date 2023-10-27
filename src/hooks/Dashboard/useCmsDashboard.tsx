import { useLazyDashboardCmsQuery, useLazyDashboardHeaderCmsQuery, useLazyDashboardbuttonCmsQuery, useLazyDashboardbuttonFloatingCmsQuery } from '@/api/cmsApi/Dashboard/api';
import { selectAccessToken } from '@/features/auth/authSlice';
import { DashboardCms } from '@/fixtures/DashboardCmsData';

import { useTypedSelector } from '@/store/store';
import { useEffect, useState } from 'react';

type initialStateType = {
  buttonData: any;
  cardData: any;
  headerData: any;
  buttonFloatingData: any;
  error: any;
  fetching: boolean;

};
// @/fixtures/Cms/Dashboard/dashboardcms

const initialState = {
  buttonData: null,
  cardData: null,
  headerData: null,
  buttonFloatingData: null,
  error: null,
  fetching: true,
};

const useCmsDashboard = () => {
  const accessToken = useTypedSelector(selectAccessToken);
  const [content, setContent] = useState<initialStateType>(initialState);
  const [dashboard, { ...rest }] = useLazyDashboardCmsQuery();
  const [dashboardcard] = useLazyDashboardbuttonCmsQuery();
  const [dashboardheader] = useLazyDashboardHeaderCmsQuery();
  const [dashboardcardbuttonFloating] = useLazyDashboardbuttonFloatingCmsQuery();
  // let responseData = DashboardCms;

  const fetchCms = async () => {
    try {
      setContent(initialState);
      const { data: button_data = null } = await dashboard({});
      const { data: card_data = null } = await dashboardcard({});
      const { data: header_data = null } = await dashboardheader({});
      const { data: button_floating_data = null } = await dashboardcardbuttonFloating({});


      if (button_data != null) {
        setContent(prevState => ({
          ...prevState,
          buttonData: button_data.length ? button_data[0] : {},
          fetching: false,
        }));
      } else {
        setContent(prevState => ({
          ...prevState,
          fetching: false,
          error: 'No Data Found',
        }));
      }
      if (card_data != null) {
        setContent(prevState => ({
          ...prevState,
          cardData: card_data.length ? card_data[0] : {},
          fetching: false,
        }));
      } else {
        setContent(prevState => ({
          ...prevState,
          fetching: false,
          error: 'No Data Found',
        }));
      }
      if (header_data != null) {
        setContent(prevState => ({
          ...prevState,
          headerData: header_data.length ? header_data[0] : {},
          fetching: false,
        }));
      } else {
        setContent(prevState => ({
          ...prevState,
          fetching: false,
          error: 'No Data Found',
        }));
      }
      if (button_floating_data != null) {
        setContent(prevState => ({
          ...prevState,
          buttonFloatingData: button_floating_data.length ? button_floating_data[0] : {},
          fetching: false,
        }));
      } else {
        setContent(prevState => ({
          ...prevState,
          fetching: false,
          error: 'No Data Found',
        }));
      }

    } catch (error: any) {
      setContent(prevState => ({
        ...prevState,
        // headerContent: DashboardCms[0]?.CurvedHeader,
        // MainWalletContent: DashboardCms[0]?.MainWalletCard,
        // LinearTabsContent: DashboardCms[0]?.LinearTabButton,
        buttonData: DashboardCms?.TabButton[0],
        cardData: DashboardCms?.Card[0],
        headerData: DashboardCms?.Header[0],
        buttonFloatingData: DashboardCms?.floatingButton[0],
        fetching: false,
        error: error.message,
      }));
    }
  };

  const refetch = () => {
    fetchCms();
  };

  useEffect(() => {
    fetchCms();
  }, []);

  return { ...content, refetch, rest };
};

export default useCmsDashboard;

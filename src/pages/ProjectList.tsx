import { useCallback, useEffect, useState } from 'react';
// _mock_
// components
import Page from 'components/Page';
// hooks
// _types

// @mui
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ProjectType } from '_types/product';
import { getProductList, searchProduct } from 'redux/slices/product';
import { useDispatch, useSelector } from 'redux/store';
import { debounce } from 'lodash';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Iconify from 'components/Iconify';
import LoadingScreen from 'components/LoadingScreen';
import Scrollbar from 'components/Scrollbar';
import useSettings from 'hooks/useSettings';

// ----------------------------------------------------------------------

export default function ProjectList() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector((state) => state.product);

  const [searchText, setsearchText] = useState('');
  const [products, setProducts] = useState<ProjectType[]>([]);
  const [skip, setSkip] = useState(0);

  const debouncedSearchProjects = debounce((value: string) => {
    if (value) {
      dispatch(
        searchProduct({
          searchKey: value,
        })
      );
    }
  }, 500);

  const debouncedGetProjects = debounce((value) => {
    dispatch(
      getProductList({
        limit: 20,
        skip: value + 20,
      })
    );
  }, 200);

  useEffect(() => {
    dispatch(
      getProductList({
        limit: 20,
        skip: 0,
      })
    );
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      debouncedGetProjects(skip);
    }
  }, [skip]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (productList && productList?.products.length > 0) {
      setProducts(
        products.length > 0 ? [...products, ...productList.products] : productList.products
      );
      setSkip(productList?.skip);
    }
  }, [productList]);

  useEffect(() => {
    debouncedSearchProjects(searchText);
    setProducts([]);
  }, [searchText]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearchText(event.target.value);
  };

  return (
    <Page title="Product List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          sx={{ marginBottom: 0 }}
          links={[]}
          action={
            <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
              <TextField
                fullWidth
                value={searchText}
                onChange={onSearch}
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          }
        />
        <Divider />
        <Scrollbar>
          <Grid container sx={{ backgroundColor: '#F5F5F5', padding: '50px' }} spacing={2}>
            {products?.map((item, index) => (
              <Grid key={`${index}-${item.id}`} item xs={12} sm={6} lg={4}>
                <Card sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        sx={{ color: 'text.secondary' }}
                      >
                        {item.price}$
                      </Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ width: 200 }}
                    image={item.images[0]}
                    alt={item.title}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Scrollbar>
        {isLoading && <LoadingScreen />}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

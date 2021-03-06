import React, { useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getArticles } from '../api/articles';
import { Article } from '../api/types';
import Articles from '../components/Articles';
import { useUserState } from '../contexts/UserContext';

function ArticlesScreens() {
    const { data, isFetchingNextPage, fetchNextPage, refetch, isFetching, fetchPreviousPage, isFetchingPreviousPage } =
        useInfiniteQuery('articles', ({ pageParam }) => getArticles({ ...pageParam }), {
            getNextPageParam: (lastPage) =>
                lastPage.length === 10 ? { cursor: lastPage[lastPage.length - 1].id } : undefined,
            getPreviousPageParam: (_, allPages) => {
                const validPage = allPages.find((page) => page.length > 0);
                if (!validPage) {
                    return undefined;
                }
                return {
                    prevCursor: validPage[0].id,
                };
            },
        });

    const items = useMemo(() => {
        if (!data) {
            return null;
        }
        return ([] as Article[]).concat(...data.pages);
    }, [data]);

    const [user] = useUserState();

    if (!items) {
        return <ActivityIndicator size="large" style={styles.spinner} />;
    }
    return (
        <Articles
            articles={items}
            showWritButton={!!user}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            refresh={fetchPreviousPage}
            isRefreshing={isFetchingPreviousPage}
        />
    );
}

const styles = StyleSheet.create({
    spinner: {
        flex: 1,
    },
});

export default ArticlesScreens;

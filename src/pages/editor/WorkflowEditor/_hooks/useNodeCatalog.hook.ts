import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { NodeTypeService } from '@/api/modules/node-types';
import { adaptNodeTypeToDefinition } from '../_helper/node.adapter';
import { NODE_CATALOG } from '../_helper/nodeCatalog.constants';
import type { TNodeDefinition } from '../_types/node.type';

interface UseNodeCatalogResult {
	nodes: TNodeDefinition[];
	nodeMap: Record<string, TNodeDefinition>;
	isLoading: boolean;
	isError: boolean;
	refetch: () => void;
}

/**
 * Hook to fetch node types from API with fallback to static catalog
 */
export const useNodeCatalog = (): UseNodeCatalogResult => {
	const {
		data: apiNodes,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['editor', 'node-catalog'],
		queryFn: () => NodeTypeService.list(),
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes
		retry: 2,
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});

	// Transform API nodes to frontend definitions
	const nodes = useMemo(() => {
		if (apiNodes && Array.isArray(apiNodes)) {
			return apiNodes.map(adaptNodeTypeToDefinition);
		}
		// Fallback to static catalog
		return NODE_CATALOG;
	}, [apiNodes]);

	// Create lookup map for fast access
	const nodeMap = useMemo(() => {
		return Object.fromEntries(nodes.map((node) => [node.key, node])) as Record<
			string,
			TNodeDefinition
		>;
	}, [nodes]);

	return {
		nodes,
		nodeMap,
		isLoading: isLoading && !apiNodes,
		isError,
		refetch,
	};
};

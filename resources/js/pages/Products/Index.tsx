import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}
interface PageProps {
    products: Product[];
}

export default function Index() {
    const { products } = usePage<PageProps>().props;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the product "${name}"?`)) {
            destroy(`/products/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="m-4">
                <Link href="/products/create">
                    <Button>Create a product</Button>
                </Link>
            </div>
            <div className="m-4">
                {products.length > 0 ? (
                    <Table>
                        <TableCaption>
                            A list of your recent products
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Id</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>
                                        ${product.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link
                                            href={`/products/${product.id}/edit`}
                                            className="bg-slate-600 hover:bg-slate-700"
                                        >
                                            <Button>Edit</Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            className="bg-red-500 hover:bg-red-700"
                                            onClick={() =>
                                                handleDelete(
                                                    product.id,
                                                    product.name,
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="m-4">No products found.</div>
                )}
            </div>
        </AppLayout>
    );
}

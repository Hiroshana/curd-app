import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit a Product',
        href: '/products/edit',
    },
];

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

interface PageProps {
    product: Product;
}
export default function Edit({ product }: PageProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: product?.name ?? '',
        price: product?.price !== undefined ? String(product.price) : '',
        description: product?.description ?? '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a new product" />
            <div className="w-6/12 p-4">
                <form className="space-y-3" onSubmit={handleUpdate}>
                    <div className="">
                        <Label htmlFor="product name">Name</Label>
                        <Input
                            placeholder="Product name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-xs text-red-600">
                                {errors.name}
                            </div>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor="product price">Price</Label>
                        <Input
                            placeholder="Product price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && (
                            <div className="text-xs text-red-600">
                                {errors.price}
                            </div>
                        )}
                    </div>
                    <div className="">
                        <Label htmlFor="product description">Description</Label>
                        <Textarea
                            placeholder="Product description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>
                    <Button type="submit">Update Product</Button>
                </form>
            </div>
        </AppLayout>
    );
}

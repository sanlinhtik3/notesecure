"use client"

import React, { useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Input, SortDescriptor, Button, User } from "@nextui-org/react";
import useSWR from "swr";
import { SearchIcon } from "./icons/SearchIcon";
import { deletedUser } from "../action";
import { ButtonX } from "../components/Button";
import Link from "next/link";
import EditUser from "../components/EditUser";
import { AES, enc } from "crypto-js";

const fetcher = (url: string, options: RequestInit) => fetch(url, options).then((res) => res.json());


export default function UserTable() {
    const [page, setPage] = React.useState(1);

    // -------------------------encrypt-------------------------------->
    const password = 'your-secret-password';
    // -------------------------encrypt-------------------------------->

    // const { data, isLoading } = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
    //     keepPreviousData: true,
    // });

    const { data, isLoading } = useSWR(`http://localhost:3000/api/user?page=${page}`, fetcher, {
        keepPreviousData: true,
    });

    // ---------------------------------------------------------> 
    // console.log(data)

    // const rowsPerPage = 10;

    // const pages = useMemo(() => {
    //     return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    // }, [data?.count, rowsPerPage]);

    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";



    // TOP CONTENT START

    const [filterValue, setFilterValue] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [lo, setLo] = React.useState(false);

    console.log('update data', lo)

    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = data?.results;

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user: any) =>
                user.email.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [data?.results, filterValue, lo, setLo]);

    const pages = Math.ceil(filteredItems?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems?.slice(start, end);
    }, [page, filteredItems, rowsPerPage, lo, setLo]);

    console.log('items', items)

    const sortedItems = React.useMemo(() => {
        return [items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as number;
            const second = b[sortDescriptor.column as keyof User] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items, lo, setLo]);

    // console.log('sortedItems', ...sortedItems)

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    // RENDER CELL START
    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        // const cellValue = user[columnKey as keyof User];
        const cellValue = user?.name === null ? "Unknown" : AES.decrypt(user?.name, password).toString(enc.Utf8)


        switch (columnKey) {
            case "email":
                return (
                    <User
                        // avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Link href={`#`}>Go to profile</Link>
                        <EditUser note={user} />
                        <form action={deletedUser}>
                            <input type="hidden" name="userId" value={user._id} />
                            <ButtonX color="danger">
                                Delete
                            </ButtonX>
                        </form>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    // RENDER CELL END

    // NEXT CONTENT START
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    // NEXT CONTENT END

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {data && data?.count} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        onSearchChange,
        onRowsPerPageChange,
    ]);

    // TO CONTENT END


    // BOTTOM CONTENT START
    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">

                {/* <span className="w-[30%] text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span> */}
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [items?.length, page, pages, hasSearchFilter]);
    // BOTTOM CONTENT END


    return (
        <Table
            aria-label="Example table with client async pagination"
            topContent={topContent}

            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}

            bottomContent={bottomContent}
            bottomContentPlacement="outside"

        // bottomContent={
        //     pages > 0 ? (
        //         <div className="flex w-full justify-center">
        //             <Pagination
        //                 isCompact
        //                 showControls
        //                 showShadow
        //                 color="primary"
        //                 page={page}
        //                 total={pages}
        //                 onChange={(page) => setPage(page)}
        //             />
        //         </div>
        //     ) : null
        // }
        // {...args}
        >
            <TableHeader>
                <TableColumn key="email">Name</TableColumn>
                <TableColumn key="actions">Actions</TableColumn>
            </TableHeader>
            <TableBody
                // items={data?.results ?? []}
                items={sortedItems[0] ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState}
                emptyContent={"No users found"}
            >
                {(item) => (
                    <TableRow key={item?._id}>
                        {/* {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>} */}
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

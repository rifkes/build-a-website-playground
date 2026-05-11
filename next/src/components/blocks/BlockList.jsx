export default function ListBlock(props) {
  const { children, value } = props;

  if (value?.listItem === 'bullet') {
    return <ul className='list-disc list-outside px-4 sm:px-8 pl-16 max-w-textcol mx-auto w-full'>{children}</ul>;
  }

  if (value?.listItem === 'number') {
    return <ol className='list-decimal list-outside px-4 sm:px-8 pl-16 max-w-textcol mx-auto w-full'>{children}</ol>;
  }

  return null;
}

const AddBlogForm = ()=> {
    return (
        <div>
            <form>
               Title: <input type="text" name="title" /> <br />
               Author: <input type="text" name="author" /> <br />
               Url: <input type="text" name="url" /> <br />
               <button type="submit">create</button>
            </form>
        </div>
    )
}
export default AddBlogForm;
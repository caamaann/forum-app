import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncCreateThread } from '../../states/actions/threadActions';
import Button from '../common/Button';
import Input from '../common/Input';
import Textarea from '../common/Textarea';

function CreateThreadInput() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const thread = await dispatch(
        asyncCreateThread({
          title: title.trim(),
          body: body.trim(),
          category: category.trim(),
        })
      );

      if (thread) {
        navigate(`/threads/${thread.id}`);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create New Thread</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="Title"
            id="title"
            placeholder="Thread title"
            value={title}
            onChange={(e) => handleChange(e, setTitle)}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Category"
            id="category"
            placeholder="Thread category (e.g. general, help, discussion)"
            value={category}
            onChange={(e) => handleChange(e, setCategory)}
          />
        </div>

        <div className="mb-6">
          <Textarea
            label="Content"
            id="body"
            placeholder="Write your thread content here..."
            value={body}
            onChange={(e) => handleChange(e, setBody)}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="button" variant="outline" className="mr-2" onClick={() => navigate('/')}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !title.trim() || !body.trim()}>
            {isSubmitting ? 'Creating...' : 'Create Thread'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateThreadInput;
